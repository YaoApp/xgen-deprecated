import { useState, useEffect } from 'react'

export const useVisibleMore = () => {
	const [visible_more, setVisibleMore] = useState(false)
	const [display_more, setDisplayMore] = useState(false)
	const [opacity_more, setOpacityMore] = useState(false)

	useEffect(() => {
		if (visible_more) {
			setDisplayMore(true)

			setTimeout(() => {
				setOpacityMore(true)
			}, 0)
		} else {
			setOpacityMore(false)

			const timer = setTimeout(() => {
				setDisplayMore(false)
			}, 300)

			return () => clearTimeout(timer)
		}
	}, [visible_more])

	return { visible_more, display_more, opacity_more, setVisibleMore }
}

export const useFilters = (setting: any) => {
	if (!setting.filters) return []

	const _filters = setting.filters
	const _layouts = setting.list.layout.filters

	const filters = _layouts.reduce((total: Array<any>, item: any) => {
		total.push({
			..._filters[item.name],
			span: item.width
		})

		return total
	}, [])

	return filters
}
