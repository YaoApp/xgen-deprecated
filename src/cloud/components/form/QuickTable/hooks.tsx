import { useMemo } from 'react'

export const useColumns = (setting: any) => {
	const columns = useMemo(() => {
		if (!setting.columns) return []

		const _columns = setting.columns
		const _layouts = setting.list.layout.columns

		const columns = _layouts.reduce((total: Array<any>, it: any, index: number) => {
			const item = {
				..._columns[it.name],
				...it,
				title: it.name
			}

			if (it.width) item['width'] = it.width

			item['key'] = _columns[item.label].edit.props.value.replace(':', '')

			total.push(item)

			return total
		}, [])

		return columns
	}, [setting])

	return columns
}
