import { useEffect, useMemo, useState } from 'react'

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
	const filters = useMemo(() => {
		if (!setting.filters) return []

		const _filters = setting.filters
		const _layouts = setting.list.layout.filters

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

export const useCalcLayout = (filters: Array<any>, setting: any) => {
	return useMemo(() => {
		if (!filters.length) return { base: [], more: [], visible_btn_more: false }

		const setting_cols = setting.list?.actions?.create ? 3 : 0
		const base: Array<any> = []
		const more: Array<any> = []

		const filter_cols = filters.reduce((total: number, item: any) => {
			total += item.span

			if (total > 20 - setting_cols) {
				more.push(item)
			} else {
				base.push(item)
			}

			return total
		}, 0)

		return { base, more, visible_btn_more: filter_cols > 20 - setting_cols }
	}, [filters, setting])
}
