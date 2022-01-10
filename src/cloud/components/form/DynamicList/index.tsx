import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import List from './components/List'
import styles from './index.less'

interface IProps {
	name: string
	setting: string
	type: string
	label: string
	value: any
	query?: any
	onChange: any
}

const Component = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<Array<any>>([])

	const api = {
		setting: `/api/xiang/setting/${props.setting}`
	}

	const getSetting = async () => {
		const data = await request(api.setting)

		setSetting(data)
	}

	useEffect(() => {
		if (!props?.setting) return

		getSetting()
	}, [props.setting])

	useEffect(() => {
		if (!props.value) return

		setData(Array.isArray(props.value) ? props.value : props.value.data)
	}, [props.value])

	return (
		<div className={styles._local}>
			<div
				className={clsx([
					'quick_table_wrap w_100',
					props?.type === 'view' && 'disabled'
				])}
			>
				{setting?.columns && (
					<List
						setting={setting}
						data={data}
						type={props.type}
						label={props.label}
						query={props.query || {}}
						trigger={props.onChange}
					></List>
				)}
			</div>
		</div>
	)
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)} label=''>
			<Component {...props}></Component>
		</Item>
	)
}

export default window.$app.memo(Index)
