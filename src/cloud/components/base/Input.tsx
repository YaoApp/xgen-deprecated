import { Form, Input } from 'antd'

import type { InputProps, FormItemProps } from 'antd'

const { Item } = Form

const Index = (props: InputProps & { name: string; label?: string; rules?: Array<any> }) => {
	const rules = props.rules ? { rules: props.rules } : {}

	const props_item: FormItemProps = {
		label: props.label,
		name: props.name.replace(':', ''),
		noStyle: !props.label,
		...rules
	}

	return (
		<Item {...props_item}>
			<Input
				{...props}
				placeholder={props.placeholder || `请输入${props.label}`}
			></Input>
		</Item>
	)
}

export default window.$app.memo(Index)
