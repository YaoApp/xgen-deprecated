import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { history } from 'umi'

import { del, find, getSetting, save } from '@/services/app'
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

				const reg = pathToRegexp('/form/:name/:id')
				const params_arr = reg.exec(location.pathname)

				if (!params_arr) return
				if (params_arr.length !== 3) return

				const name = params_arr[1]
				const id = params_arr[2]

				if (id !== '0') {
					dispatch({
						type: 'find',
						payload: { name, id }
					})
				}

				dispatch({
					type: 'getSetting',
					payload: { name }
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
		*find({ payload: { name, id } }, { call, put }) {
			const data = yield call(find, { name, id })

			yield put({
				type: 'updateState',
				payload: { data }
			})
		},
		*save({ payload: { name, data } }, { call }) {
			const res = yield call(save, { name, data })

			if (res === false) return

			message.success('操作成功')

			history.goBack()
		},
		*del({ payload: { name, id } }, { call }) {
			const res = yield call(del, { name, id })

			if (res === false) return

			message.success('删除成功')

			history.goBack()
		}
	}
})
