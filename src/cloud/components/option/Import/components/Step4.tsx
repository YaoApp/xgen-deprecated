import { message } from 'antd'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import { Icon } from '@/components'

import type { IPropsStep4 } from '../types'

const Index = (props: IPropsStep4) => {
	const { api, preview_payload } = props
	const [result, setResult] = useState<{
		total: number
		success: number
		failure: number
		ignore: number
	}>({ total: 0, success: 0, failure: 0, ignore: 0 })

	const importData = async () => {
		const close = message.loading('loading', 0)

		const result = await request(api.import, {
			method: 'POST',
			data: preview_payload
		})

		close()

		message.success('导入成功')

		setResult(result)
	}

	useEffect(() => {
		if (!preview_payload?.mapping) return

		importData()
	}, [api, preview_payload])

	return (
		<div className='result_items flex w_100 border_box align_center justify_between'>
			<div className='result_item total flex flex_column align_center'>
				<Icon className='icon_result' name='icon-align-justify' size={36}></Icon>
				<div className='flex align_center'>
					<span className='text'>全部</span>
					<span className='count'>{result.total}</span>
				</div>
			</div>
			<div className='result_item result success flex flex_column align_center'>
				<Icon className='icon_result' name='icon-check' size={36}></Icon>
				<div className='flex align_center'>
					<span className='text'>导入成功</span>
					<span className='count'>{result.success}</span>
				</div>
			</div>
			<div className='result_item result failure flex flex_column align_center'>
				<Icon className='icon_result' name='icon-x' size={36}></Icon>
				<div className='flex align_center'>
					<span className='text'>导入失败</span>
					<span className='count'>{result.failure}</span>
				</div>
			</div>
			<div className='result_item result ignore flex flex_column align_center'>
				<Icon className='icon_result' name='icon-alert-circle' size={36}></Icon>
				<div className='flex align_center'>
					<span className='text'>忽略</span>
					<span className='count'>{result.ignore}</span>
				</div>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
