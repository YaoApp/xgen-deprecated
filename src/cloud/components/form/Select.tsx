import { useRequest } from 'ahooks'
import { Select } from 'antd'
import { useMemo } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import type { SelectProps } from 'antd'

const { Option } = Select

interface IProps extends SelectProps<any> {
	name: string
	bind?: string
	label?: string
	string?: '1' | '0' | undefined
	rules: Array<any>
	remote: {
		api: string
		query: {
			keyword: string
			select: Array<string>
		}
	}
}

const Index = (props: IProps) => {
	let data: any = []

	if (props.remote) {
		const res = useRequest(() =>
			request(`${props.remote.api}?select=${props.remote.query.select.join(',')}`)
		)

		data = res.data
	} else {
		data = props.options
	}

	const real_props = useMemo(() => {
		const _props = { ...props }

		if (_props.showSearch) {
			_props.filterOption = (input, option) => {
				return option?.children.toLowerCase().indexOf(input) >= 0
			}
		}

		return _props
	}, [props])

	return (
		<Item {...(props as any)}>
			<Select
				{...real_props}
				placeholder={props.placeholder || `请选择${props.label}`}
				allowClear
			>
				{(data || []).map(
					(item: { id: number; name: string; label?: string; value?: any }) => (
						<Option
							key={item.id || item.value}
							value={
								props.string === '1'
									? String(item.id || item.value)
									: item.id || item.value
							}
						>
							{item.name || item.label}
						</Option>
					)
				)}
			</Select>
		</Item>
	)
}

export default window.$app.memo(Index)
