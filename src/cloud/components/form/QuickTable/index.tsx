import { message, Table } from 'antd'
import { cloneDeep } from 'lodash-es'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import { getDeepValue } from '@/utils/helpers/filters'

import { useColumns } from './hooks'
import styles from './index.less'

interface IProps {
	name: string
	type: string
	label: string
	query?: any
	queryDataSource?: any
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
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

		close()
	}

	const add = (index: number) => {
		const _data = cloneDeep(data)
		const _item = cloneDeep(data[0])

		for (const key in _item) {
			//@ts-ignore
			_item[key] = undefined
		}

		_data.splice(index + 1, 0, _item)

		setData(_data)
	}

	const remove = (index: number) => {
		const _data = cloneDeep(data)

		_data.splice(index, 1)

		setData(_data)
	}

	useEffect(() => {
		if (
			props?.name &&
			props?.queryDataSource &&
			Object.keys(props.queryDataSource).length
		) {
			getSetting()
			getData()
		}
	}, [props])

	const columns = useColumns(setting, {
		data,
		getData,
		save,
		add,
		remove
	})

	return (
		<div className={styles._local}>
			<span className='table_title'>{props.label}</span>
			<Table
				className='w_100'
				dataSource={data || []}
				columns={columns}
				rowKey={(item: any) => item?.id}
				showHeader={false}
				pagination={false}
				{...props}
			/>
		</div>
	)
}

export default window.$app.memo(Index)
