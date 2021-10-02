import { request } from 'umi'

export const search = ({ name, query }: any) => {
	return request(`/api/xiang/table/${name}/search${`?${query}` || ''}`)
}
