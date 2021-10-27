import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { history } from 'umi'

import { getSetting } from '@/services/app'
import { search } from '@/services/kanban'
import pageModel from '@/utils/model'

export default modelExtend(pageModel, {
	state: {
		setting: {},
		data: {}
	},

	subscriptions: {
		setup({ history: _history, dispatch }) {
			const unlisten = _history.listen(async (location) => {
				await window.$app.nextTick()

				const reg = pathToRegexp('/kanban/:name')
				const params_arr = reg.exec(location.pathname)

				if (!params_arr) return
				if (params_arr.length !== 2) return

				const name = params_arr[1]

				dispatch({
					type: 'search',
					payload: { name }
				})

				dispatch({
					type: 'getSetting',
					payload: { type: 'page', name }
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
				payload: { setting }
			})
		},
		*search({ payload: { name } }, { call, put }) {
			const { data } = yield call(search, { name })

			yield put({
				type: 'updateState',
				payload: { data }
			})
		}
	}
})
