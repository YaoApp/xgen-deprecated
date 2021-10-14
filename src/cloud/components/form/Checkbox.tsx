import { Checkbox } from 'antd'

import { Item } from '@/components'

import type { CheckboxProps } from 'antd'

const Index = (props: CheckboxProps) => {
	const { value, ...real_props } = props

	return (
		<Item {...props} valuePropName='checked'>
			<Checkbox {...real_props}></Checkbox>
		</Item>
	)
}

export default window.$app.memo(Index)
