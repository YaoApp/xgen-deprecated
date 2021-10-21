import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { history } from 'umi'

import { getSetting } from '@/services/app'
import { batchDel, batchUpdate, save, search } from '@/services/table'
import pageModel from '@/utils/model'

import type { IModelTable } from 'umi'

export default modelExtend(pageModel, {
	state: {
		setting: {},
		table: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0,
			showSizeChanger: true
		},
		batch: false,
		selected: [],
		visible_modal: false
	} as IModelTable,

	subscriptions: {
		setup({ history: _history, dispatch }) {
			const unlisten = _history.listen(async (location) => {
				await window.$app.nextTick()

				const reg = pathToRegexp('/table/:name')
				const params_arr = reg.exec(location.pathname)

				if (!params_arr) return
				if (params_arr.length !== 2) return

				const name = params_arr[1]

				dispatch({
					type: 'search',
					payload: {
						name,
						query: location.search
					}
				})

				dispatch({
					type: 'getSetting',
					payload: { type: 'table', name }
				})
			})

			return unlisten
		}
	},

	effects: {
		*getSetting({ payload = {} }, { call, put, select }) {
			const namespace = history.location.pathname
			const models = yield select((models: any) => models)

			if ('name' in models[namespace].setting) return

			const setting = yield call(getSetting, payload)

			yield put({
				type: 'updateState',
				payload: { setting } as IModelTable
			})
		},
		*search({ payload: { name, query } }, { call, put }) {
			const data = yield call(search, { name, query })

			yield put({
				type: 'updateState',
				payload: {
					table: data.data,
					pagination: {
						current: Number(data.page) || 1,
						pageSize: Number(data.pagesize) || 10,
						total: data.total,
						showSizeChanger: true
					}
				}
			})
		},
		*save({ payload: { name, data } }, { call, put }) {
			const res = yield call(save, { name, data })

			if (res === false) return

			message.success('操作成功')

			yield put({
				type: 'search',
				payload: { name, query: history.location.search }
			})
		},
		*batchDel({ payload: { name, ids } }, { call, put }) {
			const res = yield call(batchDel, { name, ids })

			if (res === false) return

			message.success('操作成功')

			yield put({
				type: 'search',
				payload: { name, query: history.location.search }
			})
		},
		*batchUpdate({ payload: { name, ids, data } }, { call, put }) {
			const res = yield call(batchUpdate, { name, ids, data })

			if (res === false) return

			message.success('操作成功')

			yield put({
				type: 'updateState',
				payload: { batch: false, visible_modal: false } as IModelTable
			})

			yield put({
				type: 'search',
				payload: { name, query: history.location.search }
			})
		}
	}
})
