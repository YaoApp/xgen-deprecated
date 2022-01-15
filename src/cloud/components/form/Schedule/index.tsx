import clsx from 'clsx'
import { cloneDeep } from 'lodash-es'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'
import { getDeepValueByText } from '@/utils/helpers/filters'

import Left from './components/Left'
import Td from './components/Td'
import Th from './components/Th'
import styles from './index.less'

interface IProps {
	api: string
	id: string
	name: string
	setting: string
	label: string
	value: any
	onChange: any
	queryDataSource: any
}

const Component = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const id = getDeepValueByText(props.id, props.queryDataSource)

	const getSetting = async () => {
		const setting = await request(`${props.api}?id=${id}`)

		if (props.value && Array.isArray(props.value)) {
			setting['rows'] = props.value
		}

		setSetting(setting)
	}

	useEffect(() => {
		if (!props.api) return

		getSetting()
	}, [props])

	const onChange = (
		indexed: {
			parent_index: number
			tag_index: number
			tag_rows_index?: number
			day_index: number
		},
		v: any
	) => {
		const { parent_index, tag_index, tag_rows_index, day_index } = indexed

		const _setting = cloneDeep(setting)
		const _rows = _setting.rows

		if (!_rows[parent_index].children[tag_index]['value']) {
			_rows[parent_index].children[tag_index]['value'] = []
		}

		const value = _rows[parent_index].children[tag_index]['value']

		if (tag_rows_index === undefined) {
			value[day_index] = v
		} else {
			if (!value[tag_rows_index]) {
				value[tag_rows_index] = []
			}

			value[tag_rows_index][day_index] = v
		}

		setSetting(_setting)

		props.onChange(_setting.rows)
	}

	if (!setting?.cell) return null

	return (
		<div className={clsx([styles._local, 'w_100 flex flex_column'])}>
			<div className='schedule_wrap w_100 flex'>
				<Left rows={setting.rows}></Left>
				<div className='right_wrap flex flex_column'>
					<Th days={setting.days}></Th>
					<Td setting={setting} onChange={onChange}></Td>
				</div>
			</div>
		</div>
	)
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<Component {...props}></Component>
		</Item>
	)
}

export default window.$app.memo(Index)
