import { history } from 'umi'
import modelExtend from 'dva-model-extend'
import qs from 'query-string'
import pageModel from '@/utils/model'
import { getSetting } from '@/services/app'
import { search } from './service'
import type { Model } from '@/typings/dva'

export interface IModelList {
	setting: any
	list: Array<any>
	pagination: {
		current: number
		pageSize: number
		total: number
		showSizeChanger: boolean
	}
}

export default modelExtend(pageModel, {
	namespace: history.location.pathname,

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
		}
	}
}) as Model
