import { request } from 'umi'

export const getSetting = ({ name }: { name: string }) => {
	return request(`/api/xiang/page/${name}/setting`)
}

export const search = ({ name }: { name: string }) => {
	return request(`/api/xiang/page/${name}/data`)
}
