import { request } from 'umi'

export const getSetting = ({ name }: { name: string }) => {
	return request(`/api/xiang/table/${name}/setting`)
}

export const search = ({ name, query }: { name: string; query: any }) => {
	return request(`/api/xiang/table/${name}/search${`?${query}` || ''}`)
}

export const find = ({ name, id }: { name: string; id: string }) => {
	return request(`/api/xiang/table/${name}/find/${id}`)
}

export const save = ({ name, data }: { name: string; data: any }) => {
	return request(`/api/xiang/table/${name}/save${data.id ? `/${data.id}` : ''}`, {
		method: 'POST',
		data
	})
}