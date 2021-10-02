import { request } from 'umi'

export const getSetting = ({ name }: { name: string }) => {
	return request(`/api/xiang/table/${name}/setting`)
}
