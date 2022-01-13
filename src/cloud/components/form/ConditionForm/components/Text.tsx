import { Input } from 'antd'

const { TextArea } = Input

const Index = () => {
	return <TextArea></TextArea>
}

export default window.$app.memo(Index)
