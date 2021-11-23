import { request } from 'umi'

import type { IModelLoginAdmin } from 'umi'

export const getCaptcha = () => {
	return request(`/api/xiang/user/captcha?type=digit`)
}

export const login = (data: {
	mobile: string
	password: string
	captcha: IModelLoginAdmin['captcha']
}) => {
	return request(`/api/xiang/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		data
	})
}
