import { useMemo, useEffect } from 'react'
import { request } from 'umi'
import { useRequest } from 'ahooks'
import { Select, Form } from 'antd'
import type { SelectProps } from 'antd'

const { Item } = Form
const { Option } = Select

interface IProps extends SelectProps<any> {
	name: string
	label?: string
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
		<Item label={props.label} name={props.name.replace(':', '')} noStyle={!props.label}>
			<Select {...real_props} placeholder={props.placeholder || `请输入${props.label}`}>
				{(data || []).map(
					(item: { id: number; name: string; label?: string; value?: any }) => (
						<Option
							key={item.id || item.value}
							value={String(item.id || item.value)}
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