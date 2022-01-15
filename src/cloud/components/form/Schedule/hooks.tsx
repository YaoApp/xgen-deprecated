import { find } from 'lodash-es'
import { useMemo } from 'react'

export const useItemText = (it: any, value: any, select_options: Array<any>) => {
	const options = useMemo(() => {
		if (!select_options.length) return []

		return select_options.reduce((total, item) => {
			total.push({
				label: item.name || item.label,
				value: item.id || item.value
			})

			return total
		}, [])
	}, [select_options])

	const text = useMemo(() => {
		if (it.type !== 'select') {
			return value !== undefined ? value : it.title
		} else {
			if (value === undefined) return it.title

			const target = find(options, (option) => option.value === value)

			return target?.label || it.title
		}
	}, [value, it, options])

	return text
}
