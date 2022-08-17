import { Input } from 'antd'

import type { InputProps } from 'antd'

const Index = (props: InputProps) => {
	return <Input {...props}></Input>
}

export default window.$app.memo(Index)
