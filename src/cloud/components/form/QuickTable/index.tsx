import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import List from './components/List'
import { useColumns } from './hooks'
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

const QuickTable = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<Array<any>>([])

	const api = {
		setting: `/api/xiang/table/${props.setting}/setting`
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

	const columns = useColumns(setting)

	const RealList = useMemo(() => {
		if (!data.length) return null

		return List as any
	}, [data])

	return (
		<div className={styles._local}>
			<div
				className={clsx([
					'quick_table_wrap w_100',
					props?.type === 'view' && 'disabled'
				])}
			>
				{columns.length !== 0 && RealList && (
					<RealList
						{...{ data, columns }}
						type={props.type}
						label={props.label}
						query={props.query || {}}
						trigger={props.onChange}
					></RealList>
				)}
			</div>
		</div>
	)
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)} label=''>
			<QuickTable {...props}></QuickTable>
		</Item>
	)
}

export default window.$app.memo(Index)
