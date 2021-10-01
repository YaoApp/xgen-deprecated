import { useMemo } from 'react'
import { request } from 'umi'
import { useRequest } from 'ahooks'
import { Select } from 'antd'
import type { SelectProps } from 'antd'

const { Option } = Select

interface IProps extends SelectProps<any> {
	remote: {
		api: string
		query: {
			keyword: string
			select: Array<string>
		}
	}
}

const Index = (props: IProps) => {
	const { data = [] } = useRequest(() =>
		request(`${props.remote.api}?select=${props.remote.query.select.join(',')}`)
	)

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
		<Select {...real_props}>
			{data.map((item: { id: number; name: string }) => (
				<Option key={item.id} value={item.id}>
					{item.name}
				</Option>
			))}
		</Select>
	)
}

export default window.$app.memo(Index)
