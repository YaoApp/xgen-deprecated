import { request } from 'umi'

export const search = ({ name }: { name: string }) => {
	return request(`/api/xiang/page/${name}/data`)
}
