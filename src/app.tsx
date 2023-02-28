import 'nprogress/nprogress.css'

import { message } from 'antd'
import { findIndex } from 'lodash-es'
import { pathToRegexp } from 'path-to-regexp'
import store from 'store'
import { getDvaApp, history } from 'umi'

import { chart, form, kanban, screen, table } from '@/actions'
import { login_url } from '@/entry'
import { IMenu } from '@/typings/menu'

import type { RequestConfig, Dispatch, IModelApp } from 'umi'
import type { Model } from '@/typings/dva'

// 根据匹配到的url动态注册model
const model = (model: Model, url: string, app: any) => {
	app.model({
		...model,
		namespace: url
	})

	app.start()
}

/** 注销其他动态页面的model，防止出现重复执行 */
const unmodel = (reg: RegExp, url: string, app: any) => {
	for (const item of app._models) {
		if (reg.exec(item.namespace) && item.namespace !== url) app.unmodel(item.namespace)
	}
}

/** 动态页面的model注入 */
export function onRouteChange({ matchedRoutes }: any) {
	if (!matchedRoutes.length) return

	const match = matchedRoutes[matchedRoutes.length - 1].match

	const app = getDvaApp()
	const exist = findIndex(app._models, (item: Model) => item.namespace === match.url)

	const dispatch: Dispatch = app._store.dispatch
	const menu: Array<IMenu> = app._store.getState().app?.menu || []

	const hit_menu_item = (arr: Array<IMenu>): IMenu | undefined => {
		let target: any

		arr.map((item) => {
			if (item.path === match.url) {
				target = item
			} else {
				if (item.children && item.children.length) {
					const children_target = hit_menu_item(item.children)

					if (children_target) target = children_target
				}
			}
		})

		return target
	}

	const menu_item = hit_menu_item(menu)

	dispatch({
		type: 'app/updateState',
		payload: {
			visible_menu: menu_item?.visible_menu || false
		} as IModelApp
	})

	if (exist !== -1) return

	switch (match.path) {
		case '/table/:name':
			model(table, match.url, app)

			break
		case '/form/:name/:id':
			model(form, match.url, app)

			break
		case '/chart/:name':
			model(chart, match.url, app)

			break
		case '/kanban/:name':
			model(kanban, match.url, app)

			break
		case '/screen/:name':
			model(screen, match.url, app)

			break
		default:
			break
	}

	unmodel(pathToRegexp('/table/:name'), match.url, app)
	unmodel(pathToRegexp('/form/:name/:id'), match.url, app)
	unmodel(pathToRegexp('/chart/:name'), match.url, app)
	unmodel(pathToRegexp('/kanban/:name'), match.url, app)
	unmodel(pathToRegexp('/screen/:name'), match.url, app)
}

/** 全局接口配置 */
export const request: RequestConfig = {
	requestInterceptors: [
		(url, options) => {
			const session = `Bearer ${sessionStorage.getItem('token')}` || ''

			return {
				url,
				options: {
					...options,
					headers: { authorization: session }
				}
			}
		}
	],
	responseInterceptors: [
		async (response) => {
			try {
				const res = await response.clone().json()

				if (res.code === 401 || res.code === 403) {
					message.warning('尚未登录')

					if (store.get('login_url')) {
						history.push(login_url)
					}
				}
			} catch (_) {}

			return response
		}
	],
	async errorHandler(error) {
		const res: any = await error?.response.clone().json()

		if (res && (res.code === 401 || res.code === 403)) {
			if (store.get('login_url')) {
				history.push(login_url)
			}

			return
		}

		if (res && res.message) message.error(res.message)

		return false
	}
}
