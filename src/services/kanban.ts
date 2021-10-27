import { request } from 'umi'

export const search = ({ name, query }: { name: string; query: any }) => {
	return request(`/api/xiang/page/${name}/data${query ? `?${query}` : ''}`)
}
