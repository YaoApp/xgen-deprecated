import { request } from 'umi'

export const inspect = () => {
	return request(`/api/xiang/inspect`)
}

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
	return request(`/api/xiang/table/${name}/save`, {
		method: 'POST',
		data
	})
}

export const del = ({ name, id }: { name: string; id: string }) => {
	return request(`/api/xiang/table/${name}/delete/${id}`, { method: 'POST' })
}
