import { Checkbox, Form } from 'antd'

import type { CheckboxProps, FormItemProps } from 'antd'

const { Item } = Form

const Index = (props: CheckboxProps & { name: string; label?: string; rules?: Array<any> }) => {
	const rules = props.rules ? { rules: props.rules } : {}
	const { value, ...real_props } = props

	const props_item: FormItemProps = {
		label: props.label,
		name: props.name.replace(':', ''),
		noStyle: !props.label,
		...rules
	}

	return (
		<Item {...props_item} valuePropName='checked'>
			<Checkbox {...real_props}></Checkbox>
		</Item>
	)
}

export default window.$app.memo(Index)
