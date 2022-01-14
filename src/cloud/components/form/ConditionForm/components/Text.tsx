import { Input } from 'antd'

const { TextArea } = Input
import type { IPropsConditionItem } from '../types'

const Index = (props: IPropsConditionItem) => {
	const { item, index, value, onChange } = props

	return (
		<TextArea
			defaultValue={value}
			maxLength={item.children[0]?.maxLength}
			onChange={({ target: { value } }) => onChange(index, value)}
		></TextArea>
	)
}

export default window.$app.memo(Index)
