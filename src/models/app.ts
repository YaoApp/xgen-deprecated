import store from 'store'

import type { Model } from '@/typings/dva'
import type { IMenu } from '@/typings/menu'

export interface IModelApp {
	user: any
	menu: Array<IMenu>
	current_nav: number
	current_menu: number
	visible_menu: boolean
}

export default {
	namespace: 'app',

	state: {
		user: store.get('user') || [],
		menu: store.get('menu') || [],
		current_nav: store.get('current_nav') || 0,
		current_menu: store.get('current_menu') || 0,
		visible_menu: true
	} as IModelApp,

	subscriptions: {
		setup({}) {}
	},

	effects: {},

	reducers: {
		updateState(state, { payload }: any) {
			return {
				...state,
				...payload
			}
		}
	}
} as Model

export interface IModelList {
	setting: any
	list: Array<any>
	pagination: {
		current: number
		pageSize: number
		total: number
		showSizeChanger: boolean
	}
}

export interface IModelForm {
	setting: any
	data: any
}
