import store from 'store'
import { request } from 'umi'

import type { IModelLoginUser } from 'umi'

export const getCaptcha = () => {
	return request(`${store.get('app_info')?.option?.login?.password?.captcha}?type=digit`)
}

export const login = (data: {
	mobile: string
	password: string
	captcha: IModelLoginUser['captcha']
}) => {
	return request(`${store.get('app_info')?.option?.login?.password?.login}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		data
	})
}

export const loginByFeishu = (params: { code: string; state: string }) => {
	return request(`${store.get('app_info')?.option?.login?.feishu?.login}`, {
		params
	})
}

export const autoLogin = (query: any) => {
	return request('/api/demo/user', { params: query })
}
