import { Button, Modal } from 'antd'
import qs from 'query-string'
import { Fragment, useEffect, useState } from 'react'
import { request } from 'umi'

import { Charts, Icon } from '@/components'

import Filter from './components/Filter'

import type { ModalProps } from 'antd'

interface IProps {
	value: string
	name: string
}

const Index = (props: IProps) => {
	const [visible_modal, setVisibleModal] = useState(false)
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<any>({})
	const [query, setQuery] = useState<any>({})

	const api = {
		setting: `/api/xiang/chart/${props.name}/setting`,
		data: `/api/xiang/chart/${props.name}/data`
	}

	const props_modal: ModalProps = {
		visible: visible_modal,
		centered: true,
		width: 900,
		footer: false,
		closable: false,
		zIndex: 1000,
		bodyStyle: { padding: 0 },
		wrapClassName: 'custom_modal',
		onCancel: () => setVisibleModal(false)
	}

	const props_filter = {
		setting,
		setQuery
	}

	const props_charts = {
		setting,
		data
	}

	const getSetting = async () => {
		const data = await request(api.setting)

		setSetting(data)
	}

	const getData = async () => {
		let query_string = ''

		if (Object.keys(query).length) {
			query_string = `?${qs.stringify(query)}`
		}

		const { data } = await request(api.data + query_string)

		setData(data || [])
	}

	useEffect(() => {
		if (!visible_modal) return
		if (!props?.name) return

		getSetting()
		getData()
	}, [props, visible_modal])

	useEffect(() => {
		if (!Object.keys(query).length) return

		getData()
	}, [query])

	return (
		<Fragment>
			<span className='edit_text line_clamp_2' onClick={() => setVisibleModal(true)}>
				{props.value}
			</span>
			<Modal {...props_modal}>
				<div className='header_wrap w_100 border_box flex justify_between align_center'>
					<span className='title'>查看</span>
					<div className='action_items flex'>
						<Button
							className='btn btn_close'
							icon={<Icon name='icon-arrow-left' size={15}></Icon>}
							onClick={() => setVisibleModal(false)}
						>
							关闭
						</Button>
					</div>
				</div>
				<div className='custom_wrap w_100 border_box flex flex_column'>
					<Filter {...props_filter}></Filter>
					<Charts {...props_charts}></Charts>
				</div>
			</Modal>
		</Fragment>
	)
}

export default window.$app.memo(Index)
