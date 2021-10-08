export const useFieldset = (setting: any) => {
	if (!setting.filters) return []

	const _filters = setting.columns
	const _fieldset = setting.edit.layout.fieldset

	const fieldset = []

	for (const item of _fieldset) {
		fieldset.push({
			...item,
			columns: item.columns.reduce((total: Array<any>, item: any) => {
				total.push({
					..._filters[item.name],
					span: item.width,
					rules: item.rules
				})

				return total
			}, [])
		})
	}

	return fieldset
}
