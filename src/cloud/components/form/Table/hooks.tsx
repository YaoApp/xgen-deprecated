import { Button, Form, Popover } from 'antd'
import clsx from 'clsx'
import Equal from 'fast-deep-equal'
import { useMemo } from 'react'
import { getDvaApp, history, useParams } from 'umi'

import Dynamic from '@/cloud/core'
import { hidePopover } from '@/utils/helpers/dom'
import { getDeepValue } from '@/utils/helpers/filters'
import { CheckOutlined } from '@ant-design/icons'

import Block from './components/Block'
import Options from './components/Options'
import { getTargetValue, getText } from './utils'

export const useColumns = (
	setting: any,
	options: {
		useInForm: boolean
		save: (data: any) => void
		edit: (id: string, name?: string, type?: string) => void
	}
) => {
	const params = useParams<{ name: string }>()

	const columns = useMemo(() => {
		if (!setting.columns) return []

		const _columns = setting.columns
		const _layouts = setting.list.layout.columns
		const _operation = setting.list.option?.operation

		const onFinish = async (v: any, id: number) => {
			if (options?.useInForm) {
				options.save({ id, ...v })
			} else {
				getDvaApp()._store.dispatch({
					type: `${history.location.pathname}/save`,
					payload: { name: params.name, data: { id, ...v } }
				})
			}

			hidePopover()
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

				const text = getText(dataIndex, dataItem, v, cfg, _columns)

				if (cfg.edit && Object.keys(cfg.edit).length) {
					const key = _columns[cfg.label].edit.props.value.replace(':', '')

					const value = (() => {
						if (cfg.edit.type === 'select') {
							return dataItem[key] || []
						}

						return dataItem[key]
					})()

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
									}}
								>
									<Dynamic
										type='form'
										name={cfg.edit.type}
										props={{
											...cfg.edit.props,
											label: cfg.label,
											name: key,
											value,
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
					const other_props = (() => {
						if (cfg.view.type === 'a' && cfg.view.props?.href) {
							return getTargetValue(
								cfg.view.props?.href,
								'href',
								dataItem
							)
						}

						if (cfg.view.type === 'tooltip' && cfg.view.props?.title) {
							return getTargetValue(
								cfg.view.props?.title,
								'title',
								dataItem
							)
						}

						if (cfg.view.type === 'formModal') {
							return {
								...getTargetValue(
									cfg.view.props?.formId,
									'formId',
									dataItem
								),
								edit: options.edit
							}
						}

						return {}
					})()

					return cfg.view.type ? (
						<Dynamic
							type='base'
							name={cfg.view.type}
							props={{
								...cfg.view.props,
								...other_props,
								value: text
							}}
						></Dynamic>
					) : (
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

				item.render = (_: any, dataItem: any) => (
					<Block {...{ _columns, item, dataItem, getRender }}></Block>
				)

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

		if (_operation?.width !== 0) {
			columns.push(Options({ _operation, options, params, save: onFinish }))
		}

		return columns
	}, [setting])

	return columns
}
