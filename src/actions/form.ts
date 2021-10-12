import { message } from 'antd'
import modelExtend from 'dva-model-extend'
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

				const state: any = location.state

				if (!state) return
				if (!state.params) return
				if (state.match !== '/form/:name/:id') return

				const name = state.params.name
				const id = state.params.id

				if (id !== '0') {
					dispatch({
						type: 'find',
						payload: state.params
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
