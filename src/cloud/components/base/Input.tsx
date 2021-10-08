import { Form, Input } from 'antd'

import type { InputProps } from 'antd'

const { Item } = Form

const Index = (props: InputProps & { name: string; label?: string }) => {
	return (
		<Item label={props.label} name={props.name.replace(':', '')} noStyle={!props.label}>
			<Input
				{...props}
				placeholder={props.placeholder || `请输入${props.label}`}
			></Input>
		</Item>
	)
}

export default window.$app.memo(Index)
