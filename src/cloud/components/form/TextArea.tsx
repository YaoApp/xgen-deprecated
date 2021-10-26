import { Input } from 'antd'

import { Item } from '@/components'

const { TextArea } = Input

import type { TextAreaProps } from 'antd/lib/input/TextArea'

interface IProps extends TextAreaProps {
	label?: string
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<TextArea
				{...props}
				placeholder={props.placeholder || `请输入${props.label}`}
			></TextArea>
		</Item>
	)
}

export default window.$app.memo(Index)
