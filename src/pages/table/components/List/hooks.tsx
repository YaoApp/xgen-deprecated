import { Button, Form, Popover } from 'antd'
import clsx from 'clsx'
import Equal from 'fast-deep-equal'
import moment from 'moment'
import { useMemo } from 'react'
import { getDvaApp, history, useParams } from 'umi'

import Dynamic from '@/cloud/core'
import { Icon } from '@/components'
import { getDeepValue } from '@/utils/helpers/filters'
import { CheckOutlined } from '@ant-design/icons'

const getText = (dataIndex: string, dataItem: any, v: any, item: any, _columns: any) => {
	let text = v

	if (dataIndex.indexOf('.') !== -1) {
		const indexs = dataIndex.split('.')

		text = getDeepValue(indexs, dataItem)
	}

	if (item.title && _columns[item.title].view.props['datetime-format']) {
		text = v ? moment(v).format(_columns[item.title].view.props['datetime-format']) : '-'
	}

	if (item.view.type === 'image') {
		return text
	}

	return Array.isArray(text) ? text.join(',') : text !== undefined || null ? text : '-'
}

export const useColumns = (setting: any) => {
	const params = useParams<{ name: string }>()

	const columns = useMemo(() => {
		if (!setting.columns) return []

		const _columns = setting.columns
		const _layouts = setting.list.layout.columns

		const onFinish = (v: any, id: number) => {
			getDvaApp()._store.dispatch({
				type: `${history.location.pathname}/save`,
				payload: { name: params.name, data: { id, ...v } }
			})
		}

		const columns = _layouts.reduce((total: Array<any>, it: any, index: number) => {
			const item = {
				..._columns[it.name],
				...it,
				title: it.name
			}

			if (it.width) item['width'] = it.width

			const getRender = (cfg: any, dataItem: any, value?: any) => {
				const dataIndex = _columns[cfg.label].view.props.value.replace(':', '')
				const v = value

				if (cfg.edit && Object.keys(cfg.edit).length) {
					const text = getText(dataIndex, dataItem, v, cfg, _columns)
					const key = _columns[cfg.label].edit.props.value.replace(':', '')
					const value =
						cfg.edit.type === 'select'
							? dataItem[key]
								? dataItem[key]
								: []
							: dataItem[key]

					return (
						<Popover
							id='td_popover'
							overlayClassName={clsx([
								'td_popover',
								cfg.edit.type === 'upload' ? 'upload' : ''
							])}
							placement={cfg.edit.type === 'upload' ? 'bottom' : 'top'}
							trigger='click'
							destroyTooltipOnHide={{ keepParent: false }}
							content={
								<Form
									className='flex'
									name={`form_table_td_${dataIndex}_${index}`}
									initialValues={{
										[key]: value
									}}
									onFinish={(v) => {
										onFinish(v, dataItem.id)

										const td_popover =
											document.getElementById(
												'td_popover'
											)

										if (!td_popover) return

										td_popover.style.display = 'none'
									}}
								>
									<Dynamic
										type='form'
										name={cfg.edit.type}
										props={{
											...cfg.edit.props,
											label: cfg.label,
											name: key,
											style: { width: 240 }
										}}
									></Dynamic>
									<Button
										className='ml_12'
										type='primary'
										htmlType='submit'
										icon={<CheckOutlined></CheckOutlined>}
									></Button>
								</Form>
							}
						>
							<div className='edit_text line_clamp_2'>
								{cfg.view.type ? (
									<Dynamic
										type='base'
										name={cfg.view.type}
										props={{
											...cfg.view.props,
											value: text
										}}
									></Dynamic>
								) : (
									text || '-'
								)}
							</div>
						</Popover>
					)
				} else {
					return (
						<div className='line_clamp_2'>
							{getText(dataIndex, dataItem, v, cfg, _columns)}
						</div>
					)
				}
			}

			if (item.view.components) {
				const deps = Object.keys(item.view.components).reduce(
					(total: Array<string>, i) => {
						total.push(
							_columns[
								item.view.components[i]
							].view.props.value.replace(':', '')
						)

						return total
					},
					[]
				)

				item.dataIndex = deps

				item.render = (_: any, dataItem: any) => {
					const elements: any = {}

					for (const key in item.view.components) {
						const config = _columns[item.view.components[key]]
						const value = dataItem[config.view.props.value.replace(':', '')]

						elements[key] = getRender(config, dataItem, value)
					}

					return (
						<Dynamic
							type='group'
							name={item.view.type}
							props={elements}
						></Dynamic>
					)
				}

				// 针对复合组件，提取依赖字段，手动管理是否更新
				item.shouldCellUpdate = (new_val: any, old_val: any) => {
					let update = false

					deps.map((i) => {
						if (i.indexOf('.') !== -1) {
							const indexs = i.split('.')

							const _new = getDeepValue(indexs, new_val)
							const _old = getDeepValue(indexs, old_val)

							if (!Equal(_new, _old)) update = true
						} else {
							if (!Equal(new_val[i], old_val[i])) update = true
						}
					})

					return update
				}
			} else {
				item.dataIndex = _columns[item.label].view.props.value.replace(':', '')

				item.render = (value: any, dataItem: any) => {
					return getRender(item, dataItem, value)
				}
			}

			total.push(item)

			return total
		}, [])

		columns.push({
			title: '操作',
			key: 'operation',
			width: '60px',
			render: (_: any, item: any) => (
				<div className='flex justify_end'>
					<Popover
						overlayClassName='options_popover'
						placement='bottomRight'
						trigger='click'
						destroyTooltipOnHide={{ keepParent: false }}
						content={
							<div className='table_option_items flex flex_column'>
								<div
									className='table_option_item flex align_center cursor_point'
									onClick={() =>
										history.push({
											pathname: `/form/${params.name}/${item.id}`
										})
									}
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
		})

		return columns
	}, [setting])

	return columns
}
