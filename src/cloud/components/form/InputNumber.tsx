import { InputNumber } from 'antd'

import { Item } from '@/components'

import type { InputNumberProps } from 'antd'

interface IProps extends InputNumberProps {
	pure?: string
	label?: string
}

const Index = (props: IProps) => {
	const El = (
		<InputNumber
			{...props}
			placeholder={props.placeholder || `请输入${props.label}`}
		></InputNumber>
	)

	console.log(123)

	if (props.pure) return El

	return <Item {...(props as any)}>{El}</Item>
}

export default window.$app.memo(Index)
