import { message } from 'antd'
import store from 'store'

import { getUserMenu, inspect } from '@/services/app'

import type { Model } from '@/typings/dva'
import type { IMenu } from '@/typings/menu'

export interface IModelApp {
	app_info: {
		name: string
		short: string
		version: string
		description: string
		icons: {
			favicon: string
			icns: string
			ico: string
			png: string
		}
		option: {
			nav_user: string
			nav_menu: string
			hide_user: boolean
			hide_menu: boolean
			login: {
				password: {
					captcha: string
					login: string
					inspect: string
				}
				feishu?: {
					authUrl: string
					login: string
				}
			}
		}
	}
	user: any
	menu: Array<IMenu>
	current_nav: number
	current_menu: number
	visible_nav: boolean
	visible_menu: boolean
	visible_header: boolean
}

export default {
	namespace: 'app',

	state: {
		app_info: store.get('app_info') || {},
		user: store.get('user') || [],
		menu: store.get('menu') || [],
		current_nav: store.get('current_nav') || 0,
		current_menu: store.get('current_menu') || 0,
		visible_nav: true,
		visible_menu: true,
		visible_header: true
	} as IModelApp,

	subscriptions: {
		setup({ dispatch }) {
			dispatch({ type: 'inspect' })
		}
	},

	effects: {
		*inspect({}, { call, put }) {
			const app_info = yield call(inspect)

			yield put({
				type: 'updateState',
				payload: { app_info } as IModelApp
			})

			store.set('app_info', app_info)
		},
		*getUserMenu({}, { call, put }) {
			const menu = yield call(getUserMenu)

			yield put({
				type: 'updateState',
				payload: { menu } as IModelApp
			})

			store.set('menu', menu)

			message.success('菜单更新成功')
		}
	},

	reducers: {
		updateState(state, { payload }: any) {
			return {
				...state,
				...payload
			}
		}
	}
} as Model

export interface IModelTable {
	setting: any
	table: Array<any>
	pagination: {
		current: number
		pageSize: number
		total: number
		showSizeChanger: boolean
	}
	batch: boolean
	selected: Array<number>
	visible_modal: boolean
}

export interface IModelForm {
	setting: any
	data: any
}

export interface IModelChart {
	setting: any
	data: any
}
