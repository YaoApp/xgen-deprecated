import { cloneDeep } from 'lodash-es'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import Table from '@/cloud/components/form/Table'

import type { IPropsStep2 } from '../types'

const Index = (props: IPropsStep2) => {
	const { api, file_name, setPreviewPayload } = props
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<any>({})

	useEffect(() => {
		if (!file_name) return

		getSetting()
		getData()
	}, [api, file_name])

	useEffect(() => {
		setPreviewPayload({
			file: file_name,
			page: 1,
			size: 10,
			mapping: data
		})
	}, [file_name, data])

	const getSetting = async () => {
		const setting = await request(api.mapping_setting + `?file=${file_name}`)

		setSetting(setting)
	}

	const getData = async () => {
		const data = await request(api.mapping + `?file=${file_name}`)

		setData(data)
	}

	const setTableData = (v: any, index: number) => {
		const _data = cloneDeep(data.data)

		_data[index] = { ..._data[index], ...v }

		setData({ ...data, data: _data })
	}

	const props_table = {
		custom: true,
		data: data.data,
		setting,
		setTableData,
		rowKey: (item: any) => item.field
	}

	if (!data?.data) return null
	if (!setting?.list) return null

	return <Table {...props_table}></Table>
}

export default window.$app.memo(Index)
