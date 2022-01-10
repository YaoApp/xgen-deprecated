import { useMemo } from 'react'

export const useColumns = (setting: any) => {
	const { columns, children_columns } = useMemo(() => {
		if (!setting.columns) return { columns: [], children_columns: [] }

		const _columns = setting.columns
		const _layouts = setting.list.layout.columns
		const _children = setting.list.layout?.children || []

		const columns = _layouts.reduce((total: Array<any>, it: any) => {
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

		const children_columns = _children.reduce((total: Array<any>, it: any) => {
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

		return { columns, children_columns }
	}, [setting])

	return { columns, children_columns }
}
