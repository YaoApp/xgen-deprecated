import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import store from 'store'
import { history } from 'umi'

import { inspect } from '@/services/app'
import pageModel from '@/utils/model'

import { getCaptcha, login, loginByFeishu } from './service'

import type { IModelApp } from 'umi'

export interface IModelLoginUser {
	captcha: {
		id: string
		content: string
	}
}

export default modelExtend(pageModel, {
	namespace: 'login_user',

	state: {
		captcha: {}
	},

	subscriptions: {
		setup({ history, dispatch }) {
			history.listen((location) => {
				if (location.pathname.indexOf('/login/user') === -1) return

				if (location?.query?.from) {
					const { from, ...params } = location?.query

					switch (from) {
						case 'feishu':
							dispatch({ type: 'loginByFeishu', payload: params })
							break

						default:
							break
					}

					return
				}

				dispatch({ type: 'getCaptcha' })
				dispatch({ type: 'app/updateState', payload: { visible_menu: false } })
			})
		}
	},

	effects: {
		*getCaptcha({}, { call, put }) {
			if (!store.get('app_info')) {
				const app_info = yield call(inspect)

				yield put({
					type: 'updateState',
					payload: { app_info } as IModelApp
				})

				store.set('app_info', app_info)
			}

			const captcha = yield call(getCaptcha)

			yield put({
				type: 'updateState',
				payload: { captcha }
			})
		},
		*handleLogin({ payload: { res } }, { put }) {
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
		},
		*login({ payload }, { call, put }) {
			const res = yield call(login, payload)

			if (!res.token) {
				yield put({ type: 'getCaptcha' })

				return
			}

			yield put({ type: 'handleLogin', payload: { res } })
		},
		*loginByFeishu({ payload }, { call, put }) {
			const res = yield call(loginByFeishu, payload)

			if (!res) return

			yield put({ type: 'handleLogin', payload: { res } })
		}
	}
})
