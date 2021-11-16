import { message, Modal, Popover, Tooltip } from 'antd'
import clsx from 'clsx'
import { history, request } from 'umi'

import { Icon } from '@/components'
import { getDeepValueByText, getGroupValue } from '@/utils/helpers/filters'

import { hidePopover } from '../utils'

const { confirm } = Modal

const Index = ({ _options, options, params }: any) => {
	const onItem = (it: any, item: any) => {
		const data = getGroupValue(it?.data, item)

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

	if (_options) {
		if (_options?.unfold) {
			return {
				title: '操作',
				key: 'operation',
				width: _options?.width || 100,
				render: (_: any, item: any) => (
					<div className='unfold_table_option_items flex flex_wrap justify_end'>
						{!_options?.hideDefault && (
							<Tooltip title='编辑'>
								<div className='unfold_table_option_item'>
									<a
										className='icon_wrap border_box flex justify_center align_center clickable'
										onClick={() => {
											if (
												options?.useInForm &&
												options?.edit
											) {
												options.edit(item.id)
											} else {
												history.push({
													pathname: `/form/${params.name}/${item.id}`
												})
											}
										}}
									>
										<Icon
											name='icon-edit-2'
											size={13}
										></Icon>
									</a>
								</div>
							</Tooltip>
						)}
						{_options?.items.map((it: any, index: number) => (
							<Tooltip title={it.title} key={index}>
								<div
									className='unfold_table_option_item'
									key={index}
									onClick={() => onItem(it, item)}
								>
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
									{!_options?.hideDefault && (
										<div
											className='table_option_item flex align_center cursor_point'
											onClick={() => {
												if (
													options?.useInForm &&
													options?.edit
												) {
													options.edit(item.id)
												} else {
													history.push({
														pathname: `/form/${params.name}/${item.id}`
													})
												}
											}}
										>
											<Icon
												name='icon-edit-2'
												size={13}
											></Icon>
											<span className='text'>编辑</span>
										</div>
									)}
									{_options?.items.map(
										(it: any, index: number) => (
											<div
												className={clsx([
													'table_option_item flex align_center cursor_point',
													it?.danger
														? 'danger'
														: '',
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
												onClick={() =>
													onItem(it, item)
												}
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
	} else {
		return {
			title: '操作',
			key: 'operation',
			width: 60,
			render: (_: any, item: any) => (
				<div className='flex justify_end'>
					<Popover
						overlayClassName='options_popover'
						placement='bottomRight'
						trigger='click'
						zIndex={1000}
						destroyTooltipOnHide={{ keepParent: false }}
						content={
							<div className='table_option_items flex flex_column'>
								<div
									className='table_option_item flex align_center cursor_point'
									onClick={() => {
										if (
											options?.useInForm &&
											options?.edit
										) {
											options.edit(item.id)
										} else {
											history.push({
												pathname: `/form/${params.name}/${item.id}`
											})
										}
									}}
								>
									<Icon name='icon-eye' size={13}></Icon>
									<span className='text'>查看</span>
								</div>
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
