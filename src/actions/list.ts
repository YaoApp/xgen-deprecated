import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import qs from 'query-string'

import { getSetting, save, search } from '@/services/app'
import pageModel from '@/utils/model'

import type { IModelList } from 'umi'

export default modelExtend(pageModel, {
	state: {
		setting: {},
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
			showSizeChanger: true
		}
	} as IModelList,

	effects: {
		*getSetting({ payload = {} }, { call, put }) {
			const setting = yield call(getSetting, payload)

			yield put({
				type: 'updateState',
				payload: { setting } as IModelList
			})
		},
		*search({ payload: { name, query } }, { call, put }) {
			const data = yield call(search, { name, query: qs.stringify(query) })

			yield put({
				type: 'updateState',
				payload: {
					list: data.data,
					pagination: {
						current: Number(data.page) || 1,
						pageSize: Number(data.pagesize) || 10,
						total: data.total,
						showSizeChanger: true
					}
				}
			})
		},
		*save({ payload: { name, data } }, { call }) {
			const res = yield call(save, { name, data })

			if (res && res.error) {
				message.error('操作失败')
			}
		}
	}
})
