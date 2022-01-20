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
	type?: string
	setting?: any
	data?: any
	name?: string
	label?: string
	query?: any
	queryDataSource?: any
	custom?: boolean
	search?: () => void
	searchFormData?: () => void
	/** custom table 编辑table字段为更新数据传入的方法 */
	setTableData?: (v: any, index: number) => void
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState([])
	const [visible_form, setVisibleForm] = useState(false)
	const [form_params, setFormParams] = useState({ id: '', name: '', type: '' })
	const [form_setting, setFormSetting] = useState<any>({})
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
			name: '',
			type: ''
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

	const save = async (data: any, row_index: number) => {
		if (props.custom) {
			props.setTableData?.(data, row_index)

			return
		}

		const close = message.loading('loading', 0)

		await request(api.save, { method: 'POST', data })
		await getData()

		close()

		closeModal()

		props.searchFormData?.()
	}

	const find = async (id: string, name?: string) => {
		const data = await request(
			`${!name ? api.find : `/api/xiang/table/${name}/find`}/${id}`
		)

		if (name) {
			const setting = await request(`/api/xiang/table/${name}/setting`)

			setFormSetting(setting)
		}

		setFormData(data)
	}

	const edit = async (id: string, name?: string, type?: string) => {
		setFormData({})
		setFormSetting({})

		const close = message.loading('loading', 0)

		if (name) {
			// 针对在 Table 页面中使用的 Table 上的 Form
			await find(id, name)

			setFormParams({ id: id, name, type: type || '' })
		} else {
			// 针对在 Form 页面中使用的 Table 上的 Form
			await find(id)

			setFormParams({ id: id, name: form_name, type: type || '' })
		}

		setVisibleForm(true)

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

	const columns = useColumns(setting || {}, {
		useInForm: props?.name ? true : false,
		custom: !!props?.custom,
		save,
		edit,
		...(props?.custom ? { data: props.data } : {})
	})

	const props_form = {
		setting: Object.keys(form_setting).length ? form_setting : setting,
		data: form_data,
		params: form_params,
		onCancel: closeModal,
		search: props.search, // 针对在 Table 页面中使用的 Table 数据的刷新
		getData // 针对在 Form 页面中使用的 Table 数据的刷新
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
			name: form_name || '',
			type: ''
		})
	}

	const other_props: TableProps<any> = {}

	if (setting.list?.option?.operation?.scroll) {
		other_props['scroll'] = setting.list.option?.operation?.scroll
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
					<a
						id={props.label}
						className='table_title disabled'
						href={`#${props.label}`}
					>
						{props.label}
					</a>
					{props.type !== 'view' && setting?.list?.actions?.create && (
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
				sticky={props?.name || props?.custom ? false : { offsetHeader: 52 }}
				rowKey={(item) => item.id}
				pagination={false}
				{...props}
				{...other_props}
			/>
			<Modal {...props_modal}>
				<Form {...props_form}></Form>
			</Modal>
		</div>
	)
}

export default window.$app.memo(Index)
