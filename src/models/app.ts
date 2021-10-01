import store from 'store'
import { menu } from '@/_data_/menu'
import type { Model } from '@/typings/dva'
import type { IMenu } from '@/typings/menu'

export interface IModelApp {
	menu: Array<IMenu>
	current_nav: number
	current_menu: number
	visible_menu: boolean
}

export default {
	namespace: 'app',

	state: {
		menu,
		current_nav: store.get('current_nav') || 0,
		current_menu: store.get('current_menu') || 0,
		visible_menu: false
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
