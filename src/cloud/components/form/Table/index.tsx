import { Button, message, Modal, Table } from 'antd'
import clsx from 'clsx'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import Form from '@/cloud/components/form/Form'
import { getDeepValue } from '@/utils/helpers/filters'

import { useColumns } from './hooks'
import styles from './index.less'

import type { TableProps, ModalProps } from 'antd'

export interface IProps extends TableProps<any> {
	setting?: any
	data?: any
	name?: string
	label?: string
	query?: any
	queryDataSource?: any
	search?: () => void
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState([])
	const [visible_form, setVisibleForm] = useState(false)
	const [form_params, setFormParams] = useState({ id: '', name: '' })
	const [form_data, setFormData] = useState<any>({})
	const [form_name, setFormName] = useState('')

	useEffect(() => setFormName(props.name || ''), [props.name])

	const api = {
		setting: `/api/xiang/table/${props.name || form_name}/setting`,
		data: `/api/xiang/table/${props.name || form_name}/search`,
		save: `/api/xiang/table/${props.name || form_name}/save`,
		find: `/api/xiang/table/${props.name || form_name}/find`
	}

	const closeModal = () => {
		setVisibleForm(false)

		setFormParams({
			id: '',
			name: ''
		})
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

		closeModal()
	}

	const find = async (id: string, name?: string) => {
		const data = await request(
			`${!name ? api.find : `/api/xiang/table/${name}/find`}/${id}`
		)

		setFormData(data)
	}

	const edit = async (id: string, name?: string) => {
		setFormData({})

		const close = message.loading('loading', 0)

		if (name) {
			await find(id, name)

			setFormParams({ id: id, name })
		} else {
			await find(id)

			setFormParams({ id: id, name: form_name })
		}

		setVisibleForm(true)

		close()
	}

	const del = async (name: string, id: string) => {
		setFormData({})

		const close = message.loading('loading', 0)

		const res = await request(`/api/xiang/table/${name}/delete/${id}`, {
			method: 'POST'
		})

		await getData()

		close()

		setFormParams({ id: '', name: '' })
		setVisibleForm(false)

		if (res === false) return

		message.success('删除成功')
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

	const columns = useColumns(setting || {}, {
		useInForm: props?.name ? true : false,
		save,
		edit
	})

	const props_form = {
		setting,
		data: form_data,
		params: form_params,
		onCancel: closeModal,
		getData,
		search: props.search
	}

	const props_modal: ModalProps = {
		visible: visible_form,
		width: 900,
		footer: false,
		closable: false,
		zIndex: 1000,
		bodyStyle: { padding: 0 }
	}

	const onAdd = () => {
		setFormData({})
		setVisibleForm(true)

		setFormParams({
			id: '0',
			name: form_name || ''
		})
	}

	return (
		<div className='flex flex_column'>
			{props?.label && (
				<div
					className={clsx([
						'w_100 border_box flex justify_between align_center',
						styles.header
					])}
				>
					<div className='table_title'>{props.label}</div>
					{setting?.list?.actions?.create && (
						<Button
							className='btn_add flex justify_center align_center'
							type='link'
							onClick={onAdd}
						>
							{setting.list.actions.create.props.label}
						</Button>
					)}
				</div>
			)}
			<Table
				className={clsx([styles._local, props?.name ? styles.inline : ''])}
				dataSource={data || []}
				columns={columns}
				sticky={props?.name ? false : { offsetHeader: 52 }}
				rowKey={(item) => item.id}
				pagination={false}
				{...props}
			/>
			<Modal {...props_modal}>
				<Form {...props_form}></Form>
			</Modal>
		</div>
	)
}

export default window.$app.memo(Index)
