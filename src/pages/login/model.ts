import modelExtend from 'dva-model-extend'
import store from 'store'
import pageModel from '@/utils/model'
import { getCaptcha, login, inspect } from './service'

export interface IModelLogin {
	app_info: {
		name: string
		short: string
		version: string
		description: string
		icons: {
			icns: string
			ico: string
			png: string
		}
	}
	captcha: {
		id: string
		content: string
	}
}

export default modelExtend(pageModel, {
	namespace: 'login',

	state: {
		app_info: store.get('app_info') || {},
		captcha: {}
	},

	subscriptions: {
		setup({ history, dispatch }) {
			if (!store.get('app_info')) dispatch({ type: 'inspect' })

			history.listen((location) => {
				if (location.pathname !== '/login') return

				dispatch({ type: 'getCaptcha' })
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
		*login({ payload }, { call }) {
			const res = yield call(login, payload)
		},
		*inspect({}, { call, put }) {
			const app_info = yield call(inspect)

			yield put({
				type: 'updateState',
				payload: { app_info } as IModelLogin
			})
		}
	}
})
