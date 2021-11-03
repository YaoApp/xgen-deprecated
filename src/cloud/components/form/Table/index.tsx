import { message, Table } from 'antd'
import clsx from 'clsx'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import { getDeepValue } from '@/utils/helpers/filters'

import { useColumns } from './hooks'
import styles from './index.less'

import type { TableProps } from 'antd'

interface IProps extends TableProps<any> {
	setting?: any | string
	save?: string
	data?: any
	queryDataSource?: any
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState({})
	const [data, setData] = useState([])

	const getData = async () => {
		const query: any = {}

		if (props.data?.query && props?.queryDataSource) {
			Object.keys(props.data?.query).map((item) => {
				const value = props.data?.query[item]

				if (value.indexOf(':') !== -1) {
					const indexs = value.replace(':', '').split('.')

					query[item] = getDeepValue(indexs, props.queryDataSource)
				} else {
					query[item] = value
				}
			})
		}

		const { data } = await request(
			`${props.data.api}${props.data?.query ? `?${qs.stringify(query)}` : ''}`
		)

		setData(data || [])

		return
	}

	const getSetting = async () => {
		const data = await request(props.setting)

		setSetting(data)
	}

	const save = async (data: any) => {
		if (!props.save) return

		const close = message.loading('loading', 0)

		await request(props.save, { method: 'POST', data })

		await getData()

		close()
	}

	useEffect(() => {
		if (typeof props.setting === 'string') {
			getSetting()
			getData()
		} else {
			setSetting(props.setting)
			setData(props.data)
		}
	}, [props])

	const columns = useColumns(
		setting || {},
		typeof props.setting === 'string'
			? {
					noOptions: true,
					save
			  }
			: undefined
	)

	return (
		<Table
			className={clsx([
				styles._local,
				typeof props.setting === 'string' ? styles.inline : ''
			])}
			dataSource={data || []}
			columns={columns}
			sticky={typeof props.setting === 'string' ? false : { offsetHeader: 52 }}
			rowKey={(item) => item.id}
			pagination={false}
			{...props}
		/>
	)
}

export default window.$app.memo(Index)
