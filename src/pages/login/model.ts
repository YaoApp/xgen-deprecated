import modelExtend from 'dva-model-extend'
import store from 'store'
import { history } from 'umi'

import pageModel from '@/utils/model'

import { getCaptcha, login } from './service'

import type { IModelApp } from 'umi'

export interface IModelLogin {
	captcha: {
		id: string
		content: string
	}
}

export default modelExtend(pageModel, {
	namespace: 'login',

	state: {
		captcha: {}
	},

	subscriptions: {
		setup({ history, dispatch }) {
			history.listen((location) => {
				if (location.pathname !== '/login') return

				dispatch({ type: 'getCaptcha' })
				dispatch({ type: 'app/updateState', payload: { visible_menu: false } })
			})
		}
	},

	effects: {
		*getCaptcha({}, { call, put }) {
			const captcha = yield call(getCaptcha)

			yield put({
				type: 'updateState',
				payload: { captcha }
			})
		},
		*login({ payload }, { call, put }) {
			const res = yield call(login, payload)

			if (!res.token) {
				yield put({ type: 'getCaptcha' })

				return
			}

			if (!store.get('app.info')) {
				yield put({ type: 'app/inspect' })
			}

			yield put({
				type: 'app/updateState',
				payload: {
					user: res.user,
					menu: res.menus,
					current_nav: 0
				} as IModelApp
			})

			sessionStorage.setItem('token', res.token)
			store.set('user', res.user)
			store.set('menu', res.menus)
			store.set('current_nav', 0)

			yield window.$app.sleep(600)

			history.push('/kanban')
		}
	}
})
