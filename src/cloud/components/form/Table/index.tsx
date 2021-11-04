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
	setting?: any
	data?: any
	name?: string
	query?: any
	queryDataSource?: any
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState({})
	const [data, setData] = useState([])

	const api = {
		setting: `/api/xiang/table/${props.name}/setting`,
		data: `/api/xiang/table/${props.name}/search`,
		save: `/api/xiang/table/${props.name}/save`
	}

	const getData = async () => {
		const query: any = {}

		if (!props?.query) return

		Object.keys(props.query).map((item) => {
			const value = props.query[item]

			if (value.indexOf(':') !== -1) {
				const indexs = value.replace(':', '').split('.')

				query[item] = getDeepValue(indexs, props.queryDataSource)
			} else {
				query[item] = value
			}
		})

		const { data } = await request(
			`${api.data}${props.query ? `?${qs.stringify(query)}` : ''}`
		)

		setData(data || [])

		return
	}

	const getSetting = async () => {
		const data = await request(api.setting)

		setSetting(data)
	}

	const save = async (data: any) => {
		const close = message.loading('loading', 0)

		await request(api.save, { method: 'POST', data })
		await getData()

		close()
	}

	useEffect(() => {
		if (
			props?.name &&
			props?.queryDataSource &&
			Object.keys(props.queryDataSource).length
		) {
			getSetting()
			getData()
		} else {
			setSetting(props.setting)
			setData(props.data)
		}
	}, [props])

	const columns = useColumns(
		setting || {},
		props?.name
			? {
					noOptions: true,
					save
			  }
			: undefined
	)

	return (
		<Table
			className={clsx([styles._local, props?.name ? styles.inline : ''])}
			dataSource={data || []}
			columns={columns}
			sticky={props?.name ? false : { offsetHeader: 52 }}
			rowKey={(item) => item.id}
			pagination={false}
			{...props}
		/>
	)
}

export default window.$app.memo(Index)
