import { DatePicker } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { Item } from '@/components'

const { RangePicker } = DatePicker

import type { Moment } from 'moment'
import type { TimeRangePickerProps } from 'antd'

interface IProps extends TimeRangePickerProps {}

const CustomRangePicker = (props: IProps) => {
	const [value, setValue] = useState<[Moment, Moment]>()

	useEffect(() => {
		if (!props.value) return

		setValue([moment(props.value[0]), moment(props.value[1])])
	}, [props.value])

	const onChange = (v: any) => {
		if (!props.onChange) return

		props.onChange(
			[moment(v[0]).format('YYYY-MM-DD'), moment(v[1]).format('YYYY-MM-DD')] as any,
			null as any
		)

		setValue(v)
	}

	return <RangePicker {...props} value={value} onChange={onChange}></RangePicker>
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<CustomRangePicker {...props}></CustomRangePicker>
		</Item>
	)
}

export default window.$app.memo(Index)
