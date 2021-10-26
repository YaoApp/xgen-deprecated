import modelExtend from 'dva-model-extend'

import { getSetting, search } from '@/services/page'
import pageModel from '@/utils/model'

export default modelExtend(pageModel, {
	namespace: 'kanban',

	state: {
		setting: {},
		data: {}
	},

	subscriptions: {
		setup({ history, dispatch }) {
			history.listen((location) => {
				if (location.pathname !== '/kanban') return

				dispatch({
					type: 'getSetting',
					payload: { name: 'kanban' }
				})

				dispatch({
					type: 'search',
					payload: { name: 'kanban' }
				})
			})
		}
	},

	effects: {
		*getSetting({ payload: { name } }, { call, put }) {
			const setting = yield call(getSetting, { name })

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
