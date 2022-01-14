import { Checkbox } from 'antd'
import { useMemo } from 'react'

const { Group } = Checkbox

import type { IPropsConditionItem } from '../types'

const Index = (props: IPropsConditionItem) => {
	const { item, index, value, onChange } = props

	const options = useMemo(() => {
		return item.children.reduce((total: Array<any>, it: any) => {
			total.push({
				label: it.text,
				value: it.score
			})

			return total
		}, [])
	}, [item.children])

	return (
		<Group
			defaultValue={value}
			options={options}
			onChange={(value) => onChange(index, value)}
		></Group>
	)
}

export default window.$app.memo(Index)
