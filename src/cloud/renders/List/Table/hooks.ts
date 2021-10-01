export const useFilters = (data: any) => {
	if (!data.filters) return

	const _filters = data.filters
	const _layouts = data.list.layout.filters

	const filters = _layouts.reduce((total: Array<any>, item: any) => {
		total.push({
			..._filters[item.name],
			span: item.width
		})

		return total
	}, [])
      
	return filters
}
