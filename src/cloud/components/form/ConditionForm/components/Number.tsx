import { InputNumber } from 'antd'

import type { IPropsConditionItem } from '../types'

const Index = (props: IPropsConditionItem) => {
	const { item } = props

	return <InputNumber style={{ width: 240 }} placeholder='请输入数字'></InputNumber>
}

export default window.$app.memo(Index)
