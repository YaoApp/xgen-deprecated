import { Affix, Button, Col, Form, message, Modal, Row } from 'antd'
import clsx from 'clsx'
import qs from 'query-string'
import { useEffect, useMemo, useState } from 'react'
import { history, request } from 'umi'

import Dynamic from '@/cloud/core'
import { Icon } from '@/components'
import { getDeepValueByText, getGroupValue } from '@/utils/helpers/filters'

import { useFieldset } from './hooks'
import styles from './index.less'

import type { Dispatch } from 'umi'

const { useForm } = Form
const { confirm } = Modal

interface IProps {
	setting: any
	data?: any
	params: {
		id: string
		name: string
		type?: string
	}
	pathname?: string
	dispatch?: Dispatch
	onCancel?: () => void
	search?: () => void
	getData?: () => Promise<void>
}

const Index = (props: IProps) => {
	const { setting, data, params, pathname, dispatch, onCancel, getData, search } = props
	const [stick, setStick] = useState<boolean | undefined>(false)
	const [type, setType] = useState('')
	const [form] = useForm()
	const fieldset = useFieldset(setting)
	const { setFieldsValue, resetFields } = form
	const { query } = history.location

	useEffect(() => {
		if (params.id === '0' || !Object.keys(data).length) {
			return resetFields()
		}

		setFieldsValue(data)
	}, [params, data])

	useEffect(() => {
		if (pathname && dispatch) {
			// 针对 Form 页面
			setType((query?.type as string) || '')
		} else {
			// 针对 Table 中的 Form
			setType(params.type || '')
		}
	}, [params, query])

	const { onFinish, onDel } = useMemo(() => {
		if (pathname && dispatch) {
			// 针对 Form 页面
			const onFinish = (v: any) => {
				const data = params.id === '0' ? v : { ...v, id: params.id }

				dispatch({
					type: `${pathname}/save`,
					payload: { name: params.name, data, dev: setting?.edit?.option?.dev }
				})
			}

			const onDel = () => {
				dispatch({
					type: `${pathname}/del`,
					payload: { name: params.name, id: params.id }
				})
			}

			return { onFinish, onDel }
		} else {
			// 针对 Table 中的 Form
			const onFinish = async (v: any) => {
				const data = params.id === '0' ? v : { ...v, id: params.id }

				const close = message.loading('loading', 0)

				await request(`/api/xiang/table/${params.name}/save`, {
					method: 'POST',
					data
				})

				// 针对在 Form 页面中使用的 Table 上的 Form
				await getData?.()

				// 针对在 Table 页面中使用的 Table 上的 Form
				search?.()

				close()
				onCancel?.()
			}

			const onDel = async () => {
				const close = message.loading('loading', 0)

				const res = await request(
					`/api/xiang/table/${params.name}/delete/${params.id}`,
					{
						method: 'POST'
					}
				)

				if (res === false) return

				message.success('删除成功')

				// 针对在 Form 页面中使用的 Table 上的 Form
				await getData?.()

				// 针对在 Table 页面中使用的 Table 上的 Form
				search?.()

				close()
				onCancel?.()
			}

			return { onFinish, onDel }
		}
	}, [params, data])

	const onItem = (it: any) => {
		const post_data = getGroupValue(it?.data, data)

		if (it?.link) {
			window.open(`${it.link}?${qs.stringify(post_data)}`)

			return
		}

		const postAction = async () => {
			const res = await request(it.api, {
				method: 'POST',
				data: post_data
			})

			if (!res) return

			if (pathname && dispatch) {
				if (!setting?.edit?.option?.dev) {
					history.goBack()
				}
			} else {
				onCancel?.()
			}

			message.success('操作成功！')
		}

		if (it?.confirm) {
			confirm({
				title: '操作提示',
				content: `确认${it.title}？`,
				onOk() {
					postAction()
				}
			})
		} else {
			postAction()
		}
	}

	return (
		<Form
			className={styles._local}
			form={form}
			name={`form_filter_${pathname}`}
			onFinish={onFinish}
		>
			<div className='form_title_wrap w_100 border_box flex justify_between align_center'>
				<span className='title'>
					{params.id === '0' ? '创建' : type === 'view' ? '查看' : '编辑'}
				</span>
				<Affix offsetTop={11} style={{ zIndex: 101 }} onChange={(v) => setStick(v)}>
					<div
						className={clsx([
							'action_items flex transition_normal',
							stick ? 'stick' : ''
						])}
					>
						{type === 'view' && setting.edit?.option?.operation && (
							<div className='operation_wrap flex align_center'>
								{setting.edit?.option?.operation?.map(
									(item: any, index: number) => (
										<Button
											className={clsx([
												'btn_action btn_back btn auto',
												stick ? 'stick' : '',
												item?.type
													? item.type +
													  ' has_type'
													: 'btn_normal',
												item?.disabled
													? getDeepValueByText(
															item.disabled,
															data
													  )
														? 'disabled'
														: ''
													: ''
											])}
											icon={
												<Icon
													name={item.icon}
													size={15}
												></Icon>
											}
											key={index}
											onClick={() => onItem(item)}
										>
											{item.title}
										</Button>
									)
								)}
							</div>
						)}
						<Button
							className={clsx([
								'btn_action btn_back btn btn_normal',
								stick ? 'stick' : ''
							])}
							icon={<Icon name='icon-arrow-left' size={15}></Icon>}
							onClick={pathname ? () => history.goBack() : onCancel}
						>
							{pathname ? '返回' : '取消'}
						</Button>
						{type !== 'view' && (
							<Button
								className='btn_action btn_confirm'
								type='primary'
								htmlType='submit'
							>
								保存
							</Button>
						)}
					</div>
				</Affix>
			</div>
			<div className='form_wrap w_100 border_box flex flex_column'>
				{fieldset.map((item, index) => (
					<div
						className='form_item w_100 border_box flex flex_column'
						key={index}
					>
						<a
							id={item.title}
							className='form_item_title_wrap flex flex_column disabled'
							href={`#${item.title}`}
						>
							<span className='section_title'>{item.title}</span>
							<span className='desc'>{item.description}</span>
						</a>
						<Row gutter={16} wrap={true}>
							{item.columns.map((it: any, idx: number) => {
								if (it.edit.type === 'table' && params.id === '0') {
									return null
								}

								if (it.edit.type === 'table' && params.id !== '0') {
									return (
										<Col span={it.span} key={idx}>
											<Dynamic
												type='form'
												name='table'
												props={{
													...it.edit.props,
													type,
													label: it.label,
													queryDataSource: data
												}}
											></Dynamic>
										</Col>
									)
								}

								if (it.edit.type === 'quickTable') {
									return (
										<Col span={it.span} key={idx}>
											<Dynamic
												type='form'
												name='quickTable'
												props={{
													...it.edit.props,
													type,
													label: it.label,
													queryDataSource: data
												}}
											></Dynamic>
										</Col>
									)
								}

								return (
									<Col span={it.span} key={idx}>
										<Dynamic
											type='form'
											name={it.edit.type}
											props={{
												...it.edit.props,
												name: it.edit.props.value,
												label: it.label,
												rules:
													type === 'view'
														? []
														: it.rules,
												disabled: type === 'view'
											}}
										></Dynamic>
									</Col>
								)
							})}
						</Row>
					</div>
				))}
				{params.id !== '0' && type !== 'view' && setting.edit.actions.delete.type && (
					<div className='actions_wrap danger w_100 border_box flex flex_column'>
						<div className='form_item_title_wrap flex flex_column'>
							<span className='section_title'>危险操作</span>
							<span className='desc'>请谨慎使用下列功能</span>
						</div>
						<div className='action_items flex flex_column'>
							<div className='action_item w_100 border_box flex justify_between'>
								<div className='left_wrap flex flex_column'>
									<span className='title'>删除数据</span>
									<span className='desc'>
										此操作将删除本条数据，这可能会影响关联数据分析结果。
									</span>
								</div>
								<Button
									className='btn_normal'
									onClick={() =>
										confirm({
											title: '确认删除',
											content: '删除之后数据不可恢复，请谨慎操作！',
											centered: true,
											onOk() {
												onDel()
											}
										})
									}
								>
									删除
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</Form>
	)
}

export default window.$app.memo(Index)
