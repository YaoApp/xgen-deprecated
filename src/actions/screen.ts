import modelExtend from 'dva-model-extend'
import { pathToRegexp } from 'path-to-regexp'
import { history } from 'umi'

import { getSetting } from '@/services/app'
import { search } from '@/services/page'
import pageModel from '@/utils/model'

import type { IModelApp } from 'umi'

export default modelExtend(pageModel, {
	state: {
		setting: {},
		data: {}
	},

	subscriptions: {
		setup({ history: _history, dispatch }) {
			const unlisten = _history.listen(async (location) => {
				await window.$app.nextTick()

				const reg = pathToRegexp('/screen/:name')
				const params_arr = reg.exec(location.pathname)

				if (!params_arr) return
				if (params_arr.length !== 2) return

				const name = params_arr[1]

				dispatch({
					type: 'app/updateState',
					payload: {
						visible_nav: false,
						visible_menu: false,
						visible_header: false
					} as IModelApp
				})

				document.body.style.overflow = 'hidden'

				dispatch({
					type: 'search',
					payload: { name }
				})

				dispatch({
					type: 'getSetting',
					payload: { type: 'page', name }
				})
			})

			return () => {
				dispatch({
					type: 'app/updateState',
					payload: {
						visible_nav: true,
						visible_header: true
					} as IModelApp
				})

				document.body.style.overflow = 'auto'

				unlisten()
			}
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
