import { message } from 'antd'
import { findIndex } from 'lodash-es'
import pathToRegexp from 'path-to-regexp'
import { getDvaApp, history } from 'umi'

import { form, table } from '@/actions'

import type { RequestConfig } from 'umi'
import type { Model } from '@/typings/dva'

/** 注销其他动态页面的model，防止出现重复执行 */
const unmodel = (reg: RegExp, app: any) => {
	for (const item of app._models) {
		if (reg.exec(item.namespace)) app.unmodel(item.namespace)
	}
}

/** 动态页面的model注入 */
export function onRouteChange({ matchedRoutes }: any) {
	if (!matchedRoutes.length) return

	const match = matchedRoutes[matchedRoutes.length - 1].match

	const app = getDvaApp()
	const exist = findIndex(app._models, (item: Model) => item.namespace === match.url)

	history.location.state = { match: match.path, params: match.params }

	if (exist !== -1) return

	switch (match.path) {
		case '/table/:name':
			unmodel(pathToRegexp('/table/:name'), app)

			app.model({
				...table,
				namespace: match.url
			})

			break
		case '/form/:name/:id':
			unmodel(pathToRegexp('/form/:name/:id'), app)

			app.model({
				...form,
				namespace: match.url
			})
			break
		default:
			break
	}

	app.start()
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

				if (res.code === 401) {
					message.warning('尚未登录')

					history.push('/login')
				}
			} catch (_) {}

			return response
		}
	],
	async errorHandler(error) {
		const res: any = await error?.response.clone().json()

		if (res && res.status === 401) return history.push('/login')
		if (res && res.message) message.error(res.message)

		return false
	}
}
