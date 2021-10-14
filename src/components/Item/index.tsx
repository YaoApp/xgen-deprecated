import { Form } from 'antd'

import type { FormItemProps } from 'antd'

const { Item } = Form

interface IProps extends FormItemProps {
	children: JSX.Element
	name?: string
	label?: string
	rules?: Array<any>
}

const Index = (props: IProps) => {
	const { children } = props
	const rules = props.rules ? { rules: props.rules } : {}
	const valuePropName = props.valuePropName ? { valuePropName: props.valuePropName } : {}

	const props_item = {
		label: props.label,
		name: props?.name?.replace(':', ''),
		noStyle: !props.label,
		...rules,
		...valuePropName
	}

	return <Item {...props_item}>{children}</Item>
}

export default window.$app.memo(Index)
