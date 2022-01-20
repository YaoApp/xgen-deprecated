import { cloneDeep } from 'lodash-es'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import Table from '@/cloud/components/form/Table'

import type { IPropsStep3 } from '../types'

const Index = (props: IPropsStep3) => {
	const { api, preview_payload } = props
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<any>({})

	useEffect(() => {
		if (!preview_payload?.mapping) return

		getSetting()
		getData()
	}, [api, preview_payload])

	const getSetting = async () => {
		const setting = await request(api.preview_setting)

		setSetting(setting)
	}

	const getData = async () => {
		const data = await request(api.preview, {
			method: 'POST',
			data: preview_payload
		})

		setData(data)
	}

	const setTableData = (v: any, index: number) => {
		const _data = cloneDeep(data)

		_data.data[index] = { ..._data.data[index], ...v }

		setData(_data)
	}

	const props_table = {
		custom: true,
		data: data.data,
		setting,
		setTableData
	}

	if (!data?.data) return null
	if (!setting?.list) return null

	return <Table scroll={{ x: 1200 }} {...props_table}></Table>
}

export default window.$app.memo(Index)
