import { useEffect, useState } from 'react'
import { request } from 'umi'

import Dynamic from '@/cloud/core'

import type { IPropsStep2 } from '../types'

const Index = (props: IPropsStep2) => {
	const { api, file_name } = props
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<any>({})

	useEffect(() => {
		if (!file_name) return

		getSetting()
		getData()
	}, [api, file_name])

	const getSetting = async () => {
		const setting = await request(api.mapping_setting + `?file=${file_name}`)

		setSetting(setting)
	}

	const getData = async () => {
		const data = await request(api.mapping + `?file=${file_name}`)

		setData(data)
	}

	if (!data?.data) return null
	if (!setting?.list) return null

	return (
		<Dynamic
			type='form'
			name='Table'
			props={{
				normal_th: true,
				data: data.data,
				setting
			}}
		></Dynamic>
	)
}

export default window.$app.memo(Index)
