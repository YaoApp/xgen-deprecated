import { DatePicker } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

import { Item } from '@/components'

import type { Moment } from 'moment'
import type { DatePickerProps } from 'antd'

type IProps = DatePickerProps & {
	format?: string
}

const CustomDatePicker = (props: IProps) => {
	const [value, setValue] = useState<Moment>()

	useEffect(() => {
		if (!props.value) return

		setValue(moment(props.value))
	}, [props.value])

	const onChange = (v: any) => {
		if (!props.onChange) return

		props.onChange(v, '')

		setValue(v)
	}

	return <DatePicker {...props} value={value} onChange={onChange}></DatePicker>
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<CustomDatePicker {...props}></CustomDatePicker>
		</Item>
	)
}

export default window.$app.memo(Index)
