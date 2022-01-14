import { DatePicker } from 'antd'
import moment from 'moment'

import type { IPropsConditionItem } from '../types'

const Index = (props: IPropsConditionItem) => {
	const { index, value, onChange } = props

	return (
		<DatePicker
			defaultValue={value ? moment(value) : undefined}
			style={{ width: 240 }}
			onChange={(_, value) => onChange(index, value)}
		></DatePicker>
	)
}

export default window.$app.memo(Index)
