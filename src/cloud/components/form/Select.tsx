import { Select } from 'antd'
import { throttle } from 'lodash-es'
import { useMemo, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import type { SelectProps } from 'antd'

const { Option } = Select

interface IProps extends SelectProps<any> {
	name: string
	bind?: string
	label?: string
	string?: '1' | '0' | undefined
	value: string
	rules: Array<any>
	remote: {
		api: string
		query: {
			useValue?: boolean
			select: Array<string>
		}
	}
	search: {
		api: string
		key: string
	}
	options: Array<any>
}

const Index = (props: IProps) => {
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

	const real_props = useMemo(() => {
		const _props = { ...props }

		if (_props.remote) {
			getData()
		}

		if (_props.options) {
			setData(_props.options)
		}

		if (_props.showSearch) {
			_props.filterOption = (input, option) => {
				return (
					(option?.children as any)
						.toLowerCase()
						.indexOf(input.toLowerCase()) >= 0
				)
			}
		}

		if (props.search) {
			_props.onSearch = throttle(
				async (v: string) => {
					if (!v) return setData([])

					const data = await request(
						`${props.search.api}?${props.search.key}=${v}`
					)

					setData(data)
				},
				800,
				{ leading: false }
			)
		}

		return _props
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

	return (
		<Item {...(props as any)}>
			<Select
				{...real_props}
				placeholder={props.placeholder || `请选择${props.label}`}
				allowClear
				options={options}
			></Select>
		</Item>
	)
}

export default window.$app.memo(Index)
