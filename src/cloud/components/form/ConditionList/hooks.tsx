import { useMemo } from 'react'

export const useDefaultColumns = (options: any) => {
	if (!Object.keys(options).length) return []

	const columns = useMemo(() => {
		return [
			{
				key: 'title',
				label: '标题',
				title: '标题',
				width: 20,
				edit: {
					type: 'input',
					props: {
						value: ':title'
					}
				}
			},
			{
				key: 'type',
				label: '类型',
				title: '类型',
				width: 4,
				edit: {
					type: 'select',
					props: {
						value: ':type',
						options: Object.keys(options).reduce(
							(total: Array<any>, item: any) => {
								total.push({
									label: item,
									value: item
								})

								return total
							},
							[]
						)
					}
				}
			}
		]
	}, [options])

	return columns
}
