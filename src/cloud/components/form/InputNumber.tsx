import { InputNumber } from 'antd'

import { Item } from '@/components'

import type { InputNumberProps } from 'antd'

interface IProps extends InputNumberProps {
	label?: string
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<InputNumber
				{...props}
				placeholder={props.placeholder || `请输入${props.label}`}
			></InputNumber>
		</Item>
	)
}

export default window.$app.memo(Index)
