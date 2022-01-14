import { InputNumber } from 'antd'

import type { IPropsConditionItem } from '../types'

const Index = (props: IPropsConditionItem) => {
	const { item, index, value, onChange } = props

	return (
		<InputNumber
			defaultValue={value}
			style={{ width: 240 }}
			placeholder='请输入数字'
			min={item.children[0]?.min}
			max={item.children[0]?.max}
			onChange={(value) => onChange(index, value)}
		></InputNumber>
	)
}

export default window.$app.memo(Index)
