import modelExtend from 'dva-model-extend'
import pageModel from '@/utils/model'
import type { Model } from '@/typings/dva'

export interface IModelBugCreate {}

export default modelExtend(pageModel, {
	namespace: 'bug_create',

	state: {},

	subscriptions: {
		setup({ history }) {
			history.listen((location) => {
				if (location.pathname !== '/bug/create') return
			})
		}
	},

	effects: {}
}) as Model
