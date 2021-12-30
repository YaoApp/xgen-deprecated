import { Input } from 'antd'

import { Item } from '@/components'

import type { InputProps } from 'antd'

interface IProps extends InputProps {
	pure?: string
	label?: string
}

const Index = (props: IProps) => {
	const El = (
		<Input {...props} placeholder={props.placeholder || `请输入${props.label}`}></Input>
	)

	if (props.pure) return El

	return <Item {...(props as any)}>{El}</Item>
}

export default window.$app.memo(Index)
