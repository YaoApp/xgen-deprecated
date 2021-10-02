import { Input, Form } from 'antd'
import type { InputProps } from 'antd'

const { Item } = Form

const Index = (props: InputProps & { name: string }) => {
	return (
		<Item name={props.name} noStyle>
			<Input {...props}></Input>
		</Item>
	)
}

export default window.$app.memo(Index)
