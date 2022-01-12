import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import store from 'store'
import { history } from 'umi'

import pageModel from '@/utils/model'

import { getCaptcha, login } from './service'

import type { IModelApp } from 'umi'

export interface IModelLoginAdmin {
	captcha: {
		id: string
		content: string
	}
}

console.log()

export default modelExtend(pageModel, {
	namespace: 'login_admin',

	state: {
		captcha: {}
	},

	subscriptions: {
		setup({ history, dispatch }) {
			history.listen((location) => {
				if (location.pathname !== '/login/admin') return

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

			if (!store.get('app_info')) {
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
			store.set('login_url', history.location.pathname)

			yield window.$app.sleep(600)

			const index = store.get('app_info')?.option?.index

			if (index) {
				history.push(index)
			} else {
				message.success('应用未设置首页，请联系管理员')
			}
		}
	}
})
