import { Checkbox, message, Modal, Popover, Tooltip } from 'antd'
import clsx from 'clsx'
import qs from 'query-string'
import { history, request } from 'umi'

import { Icon } from '@/components'
import { hidePopover } from '@/utils/helpers/dom'
import { getDeepValueByText, getGroupValue } from '@/utils/helpers/filters'

const { confirm } = Modal

const Index = ({ _operation, options, params, save }: any) => {
	const onItem = (it: any, item: any) => {
		if (it?.type) {
			const form_name = it?.formName || params.name
			const form_id = it?.formId ? getDeepValueByText(it?.formId, item) : item.id

			if (it?.useModal) {
				if (it?.type === 'view') {
					options.edit(form_id, form_name, 'view')
				} else {
					options.edit(form_id, form_name)
				}
			} else {
				if (it?.type === 'view') {
					history.push({
						pathname: `/form/${form_name}/${form_id}`,
						query: { type: 'view' }
					})
				} else {
					history.push({
						pathname: `/form/${form_name}/${form_id}`
					})
				}
			}

			return
		}

		const data = getGroupValue(it?.data, item)

		if (it?.link) {
			window.open(`${it.link}?${qs.stringify(data)}`)

			return
		}

		const postAction = async () => {
			const res = await request(it.api, {
				method: 'POST',
				data
			})

			hidePopover()

			if (!res) return

			if (options.useInForm) {
				await options.getData()
			} else {
				options.search()
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

	const onDefaultOperation = (item: any, index: number) => {
		if (options?.useInForm && options?.edit) {
			if (index === 0) {
				options.edit(item.id, '', 'view')
			} else {
				options.edit(item.id)
			}
		} else {
			if (index === 0) {
				history.push({
					pathname: `/form/${params.name}/${item.id}`,
					query: { type: 'view' }
				})
			} else {
				history.push({
					pathname: `/form/${params.name}/${item.id}`
				})
			}
		}
	}

	if (_operation?.unfold) {
		return {
			title: '操作',
			key: 'operation',
			fixed: 'right',
			className: _operation?.scroll ? 'scroll_table_options' : '',
			width: options?.useInForm ? 110 : _operation?.width || 110,
			render: (_: any, item: any, row_index: number) => (
				<div className='unfold_table_option_items flex flex_wrap justify_end'>
					{_operation?.checkbox?.map((it: any, index: number) => {
						const checked =
							getDeepValueByText(it.value, item) === it.status[0].value
						const title = it.status[checked ? 0 : 1].label

						const onChange = (status: boolean) => {
							const status_value = it.status[status ? 0 : 1].value

							save(
								{
									[it.value.replace(':', '')]: status_value
								},
								item.id,
								row_index
							)
						}

						return (
							<Tooltip title={'已' + title} key={index}>
								<div className='unfold_table_checkbox_item flex flex_column justify_center align_center'>
									<Checkbox
										checked={checked}
										onChange={({ target: { checked } }) =>
											onChange(checked)
										}
									></Checkbox>
									{it?.visible_label && (
										<div className='check_label'>
											{title}
										</div>
									)}
								</div>
							</Tooltip>
						)
					})}
					{!_operation?.hideView && (
						<Tooltip title='查看'>
							<div className='unfold_table_option_item'>
								<a
									className='icon_wrap border_box flex justify_center align_center clickable'
									onClick={() => onDefaultOperation(item, 0)}
								>
									<Icon name='icon-eye' size={13}></Icon>
								</a>
							</div>
						</Tooltip>
					)}
					{!_operation?.hideEdit && (
						<Tooltip title='编辑'>
							<div className='unfold_table_option_item'>
								<a
									className='icon_wrap border_box flex justify_center align_center clickable'
									onClick={() => onDefaultOperation(item, 1)}
								>
									<Icon name='icon-edit-2' size={13}></Icon>
								</a>
							</div>
						</Tooltip>
					)}
					{_operation?.items?.map((it: any, index: number) => (
						<Tooltip title={it.title} key={index}>
							<div className='unfold_table_option_item' key={index}>
								<a
									className={clsx([
										'icon_wrap border_box flex justify_center align_center clickable',
										it?.danger ? 'danger' : '',
										it?.disabled
											? getDeepValueByText(
													it.disabled,
													item
											  )
												? 'disabled'
												: ''
											: ''
									])}
									onClick={() => onItem(it, item)}
								>
									<Icon name={it.icon} size={13}></Icon>
								</a>
							</div>
						</Tooltip>
					))}
				</div>
			)
		}
	} else {
		return {
			title: '操作',
			key: 'operation',
			width: 60,
			render: (_: any, item: any) => (
				<div className='flex justify_end'>
					<Popover
						id='td_popover'
						overlayClassName='options_popover'
						placement='bottomRight'
						trigger='click'
						zIndex={1000}
						destroyTooltipOnHide={{ keepParent: false }}
						content={
							<div className='table_option_items flex flex_column'>
								{!_operation?.hideView && (
									<div
										className='table_option_item flex align_center cursor_point'
										onClick={() =>
											onDefaultOperation(item, 0)
										}
									>
										<Icon name='icon-eye' size={13}></Icon>
										<span className='text'>查看</span>
									</div>
								)}
								{!_operation?.hideEdit && (
									<div
										className='table_option_item flex align_center cursor_point'
										onClick={() =>
											onDefaultOperation(item, 1)
										}
									>
										<Icon
											name='icon-edit-2'
											size={13}
										></Icon>
										<span className='text'>编辑</span>
									</div>
								)}
								{_operation?.items?.map(
									(it: any, index: number) => (
										<div
											className={clsx([
												'table_option_item flex align_center cursor_point',
												it?.danger ? 'danger' : '',
												it?.disabled
													? getDeepValueByText(
															it.disabled,
															item
													  )
														? 'disabled'
														: ''
													: ''
											])}
											key={index}
											onClick={() => onItem(it, item)}
										>
											<Icon
												name={it.icon}
												size={13}
											></Icon>
											<span className='text'>
												{it.title}
											</span>
										</div>
									)
								)}
							</div>
						}
					>
						<a className='option_icon_wrap flex justify_center align_center clickable'>
							<Icon name='icon-more-vertical' size={18}></Icon>
						</a>
					</Popover>
				</div>
			)
		}
	}
}

export default Index
