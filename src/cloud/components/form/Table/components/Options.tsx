import { message, Modal, Popover, Tooltip } from 'antd'
import clsx from 'clsx'
import { history, request } from 'umi'

import { Icon } from '@/components'
import { getDeepValueByText, getGroupValue } from '@/utils/helpers/filters'

import { hidePopover } from '../utils'

const { confirm } = Modal

const Index = ({ _operation, options, params }: any) => {
	const default_operation = [
		{
			title: '查看',
			icon: 'icon-eye'
		},
		{
			title: '编辑',
			icon: 'icon-edit-2'
		}
	]

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
			width: options?.useInForm ? 110 : _operation?.width || 110,
			render: (_: any, item: any) => (
				<div className='unfold_table_option_items flex flex_wrap justify_end'>
					{!_operation?.hideDefault &&
						default_operation.map((it: any, index) => (
							<Tooltip title={it.title} key={index}>
								<div className='unfold_table_option_item'>
									<a
										className='icon_wrap border_box flex justify_center align_center clickable'
										onClick={() =>
											onDefaultOperation(item, index)
										}
									>
										<Icon name={it.icon} size={13}></Icon>
									</a>
								</div>
							</Tooltip>
						))}
					{!options?.useInForm &&
						_operation?.items.map((it: any, index: number) => (
							<Tooltip title={it.title} key={index}>
								<div
									className='unfold_table_option_item'
									key={index}
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
								{!_operation?.hideDefault &&
									default_operation.map((it: any, index) => (
										<div
											className='table_option_item flex align_center cursor_point'
											key={index}
											onClick={() =>
												onDefaultOperation(
													item,
													index
												)
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
									))}
								{!options?.useInForm &&
									_operation?.items.map(
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
}

export default Index