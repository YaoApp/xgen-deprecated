import { useMemo } from 'react'

export const useFieldset = (setting: any) => {
	const fieldset = useMemo(() => {
		if (!setting.filters) return []

		const _filters = setting.columns
		const _fieldset = setting.edit.layout.fieldset
		const fieldset = []

		for (const item of _fieldset) {
			fieldset.push({
				...item,
				columns: item.columns.reduce((total: Array<any>, it: any) => {
					if (!it.tab) {
						total.push({
							..._filters[it.name],
							span: it.width,
							rules: it.rules
						})
					} else {
						total.push({
							...it,
							items: it.items.reduce((all: Array<any>, i: any) => {
								all.push({
									...i,
									columns: i.columns.reduce(
										(full: Array<any>, o: any) => {
											full.push({
												..._filters[o.name],
												span: o.width,
												rules: o.rules
											})

											return full
										},
										[]
									)
								})

								return all
							}, [])
						})
					}
					return total
				}, [])
			})
		}

		return fieldset
	}, [setting])

	return fieldset
}
