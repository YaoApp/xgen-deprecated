import { Input } from 'antd'

import { Item } from '@/components'

import type { InputProps } from 'antd'

interface IProps extends InputProps {
	label?: string
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<Input
				{...props}
				placeholder={props.placeholder || `请输入${props.label}`}
			></Input>
		</Item>
	)
}

export default window.$app.memo(Index)
