import { find } from 'lodash-es'
import { useEffect, useMemo, useState } from 'react'
import { request } from 'umi'

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

export const useItemText = (it: any, item: any) => {
	const { props } = it.edit
	const [data, setData] = useState<Array<any>>([])

	const getData = async () => {
		let v = ''

		if (props.remote.query?.useValue) {
			v = `&value=${props.value}`
		}

		const data = await request(
			`${props.remote.api}?select=${props.remote.query.select.join(',')}${v}`
		)

		setData(data)
	}

	useEffect(() => {
		if (props.remote) {
			getData()
		}

		if (props.options) {
			setData(props.options)
		}
	}, [props])

	const options = useMemo(() => {
		if (!data.length) return []

		if (it.edit.type === 'select') {
			return data.reduce((total, item) => {
				total.push({
					label: item.name || item.label,
					value:
						props.string === '1'
							? String(item.id || item.value)
							: item.id || item.value
				})

				return total
			}, [])
		}

		return data
	}, [data, props.string, it.edit.type])

	const text = useMemo(() => {
		if (item[it.key] === undefined) return it.title

		if (it.edit.type === 'select') {
			const target = find(options, (option) => option.value === item[it.key])

			return target?.label || it.title
		}

		if (it.edit.type === 'cascader') {
			if (Array.isArray(item[it.key])) {
				const target_label = item[it.key].reduce(
					(total: { arr: Array<string>; target: any }, item: string) => {
						const _target = find(
							total.target,
							(option) => option.value === item
						)

						total.arr.push(_target?.label || it.title)
						total.target = _target?.children || []

						return total
					},
					{ arr: [], target: options }
				)

				return target_label.arr.join('/')
			}
		}

		if (it.edit.type === 'treeSelect') {
			console.log(options)
			console.log(item[it.key])
		}

		return item[it.key] !== undefined ? item[it.key] : it.title
	}, [item, it, options])

	return text
}
