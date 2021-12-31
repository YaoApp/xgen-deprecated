import { useMemo } from 'react'

export const useFilters = (setting: any) => {
	const filters = useMemo(() => {
		if (!setting.filters) return []

		const _filters = setting.filters
		const _layouts = setting.page.layout.filters

		return _layouts.reduce((total: Array<any>, item: any) => {
			total.push({
				..._filters[item.name],
				span: item.width
			})

			return total
		}, [])
	}, [setting])

	return filters
}
