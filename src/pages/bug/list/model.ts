import modelExtend from 'dva-model-extend'
import pageModel from '@/utils/model'
import { bug_list } from '@/_data_/list'
import type { Model } from '@/typings/dva'

export interface IModelBugList {
	list: Array<any>
}

export default modelExtend(pageModel, {
	namespace: 'bug_list',

	state: {
		list: bug_list
	} as IModelBugList,

	subscriptions: {
		setup({ history }) {
			history.listen((location) => {
				if (location.pathname !== '/bug/list') return
			})
		}
	},

	effects: {}
}) as Model
