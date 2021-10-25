import { request } from 'umi'

export const search = ({ name, query }: { name: string; query: any }) => {
	return request(`/api/xiang/kanban/${name}/data${query ? `?${query}` : ''}`)
}
