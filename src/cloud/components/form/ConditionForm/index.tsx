import clsx from 'clsx'
import { cloneDeep } from 'lodash-es'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'
import { getDeepValueByText } from '@/utils/helpers/filters'

import Multiple from './components/Multiple'
import Number from './components/Number'
import Single from './components/Single'
import Text from './components/Text'
import Time from './components/Time'
import styles from './index.less'

interface IProps {
	id: string
	name: string
	setting: string
	label: string
	value: any
	onChange: any
	queryDataSource: any
}

const Component = (props: IProps) => {
	const [setting, setSetting] = useState<Array<any>>([])
	const [data, setData] = useState<Array<any>>([])

	const id = getDeepValueByText(props.id, props.queryDataSource)

	const getData = async () => {
		const setting = await request(`/api/survey/setting/${id}`)

		setSetting(setting)
	}

	useEffect(() => {
		if (!props.id) return

		getData()
	}, [props.id])

	useEffect(() => {
		if (!props.value) return

		setData(props.value)
	}, [props.value])

	const onChange = (index: number, v: any) => {
		const _data = cloneDeep(data)

		_data[index] = v

		setData(_data)

		props.onChange(_data)
	}

	return (
		<div className={clsx([styles._local, 'w_100 border_box'])}>
			{setting.map((item, index) => {
				const props_input = { item, index, value: data[index], onChange }

				return (
					<div
						className='condition_item w_100 border_box flex flex_column'
						key={index}
					>
						<div className='title'>{item.title}</div>
						{item.type === '单选' && <Single {...props_input}></Single>}
						{item.type === '多选' && <Multiple {...props_input}></Multiple>}
						{item.type === '数字' && <Number {...props_input}></Number>}
						{item.type === '文本' && <Text {...props_input}></Text>}
						{item.type === '时间' && <Time {...props_input}></Time>}
					</div>
				)
			})}
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
