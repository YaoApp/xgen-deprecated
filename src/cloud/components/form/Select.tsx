import { useRequest } from 'ahooks'
import { Form, Select } from 'antd'
import { useMemo } from 'react'
import { request } from 'umi'

import type { SelectProps, FormItemProps } from 'antd'

const { Item } = Form
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

	const rules = props.rules ? { rules: props.rules } : {}

	const props_item: FormItemProps = {
		label: props.label,
		name: props.name.replace(':', ''),
		noStyle: !props.label,
		...rules
	}

	return (
		<Item {...props_item}>
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
