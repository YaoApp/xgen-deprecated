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

	effects: {
		*getSetting({ payload = {} }, { call, put }) {
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

			if (res===false) return

			message.success('操作成功')

			history.goBack()
		},
		*del({ payload: { name, id } }, { call }) {
			const res = yield call(del, { name, id })

			if (res===false) return

			message.success('删除成功')

			history.goBack()
		}
	}
})
