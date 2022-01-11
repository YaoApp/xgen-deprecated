import { find } from 'lodash-es'
import { useEffect, useMemo, useState } from 'react'
import { request } from 'umi'

export const useDefaultColumns = (options: any) => {
	if (!Object.keys(options).length) return []

	const columns = useMemo(() => {
		return [
			{
				key: 'title',
				label: '标题',
				title: '标题',
				width: 20,
				edit: {
					type: 'input',
					props: {
						value: ':title'
					}
				}
			},
			{
				key: 'type',
				label: '类型',
				title: '类型',
				width: 4,
				edit: {
					type: 'select',
					props: {
						value: ':type',
						options: Object.keys(options).reduce(
							(total: Array<any>, item: any) => {
								total.push({
									label: item,
									value: item
								})

								return total
							},
							[]
						)
					}
				}
			}
		]
	}, [options])

	return columns
}

export const useItemText = (it: any, item: any) => {
	const { props } = it
	const [data, setData] = useState<Array<any>>([])
	const key = props.value.replace(':', '')

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
	}, [data, props.string])

	const text = useMemo(() => {
		if (it.type !== 'select') {
			return item[key] !== undefined ? item[key] : it.props.placeholder
		} else {
			if (item[key] === undefined) return it.props.placeholder

			const target = find(options, (option) => option.value === item[key])

			return target?.label || it.props.placeholder
		}
	}, [item, it, options, key])

	return text
}
