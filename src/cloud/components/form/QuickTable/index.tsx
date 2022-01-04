import { Col, message, Row } from 'antd'
import clsx from 'clsx'
import { cloneDeep } from 'lodash-es'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { request } from 'umi'

import Dynamic from '@/cloud/core'
import { Card, Icon } from '@/components'
import { getDeepValue } from '@/utils/helpers/filters'

import { useColumns } from './hooks'
import styles from './index.less'

interface IProps {
	name: string
	type: string
	label: string
	chart?: any
	query?: any
	queryDataSource?: any
	update_form?: boolean
	searchFormData?: () => void
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<Array<any>>([])
	const [raw_data, setRawData] = useState<Array<any>>([])
	const [query, setQuery] = useState<any>({})
	const [delete_ids, setDeleteIds] = useState<Array<number>>([])

	const api = {
		setting: `/api/xiang/table/${props.name}/setting`,
		data: `/api/xiang/table/${props.name}/search`,
		quicksave: `/api/xiang/table/${props.name}/quicksave`
	}

	const getData = async () => {
		const query: any = {}

		if (props?.query) {
			Object.keys(props.query).map((item) => {
				const value = props.query[item]

				if (value.indexOf(':') !== -1) {
					const indexs = value.replace(':', '').split('.')

					query[item] = getDeepValue(indexs, props.queryDataSource)
				} else {
					query[item] = value
				}
			})

			setQuery(query)
		}

		const { data } = await request(
			`${api.data}${props.query ? `?${qs.stringify(query)}` : ''}`
		)

		setData(data || [])
		setRawData(data || [])
		setDeleteIds([])

		return
	}

	const getSetting = async () => {
		const data = await request(api.setting)

		setSetting(data)
	}

	const add = (index: number) => {
		const _data = cloneDeep(data)
		const _item = cloneDeep(data[0])

		for (const key in _item) {
			_item[key] = undefined
		}

		_data.splice(index + 1, 0, _item)

		setData(_data)
	}

	const remove = (index: number) => {
		const _data = cloneDeep(data)

		if (_data[index]?.id) {
			delete_ids.push(_data[index].id)

			setDeleteIds(delete_ids)
		}

		_data.splice(index, 1)

		setData(_data)
	}

	const onChange = (index: number, v: any) => {
		const _data = cloneDeep(data)

		_data[index] = {
			..._data[index],
			...v
		}

		setData(_data)
	}

	const onSave = async () => {
		const close = message.loading('loading', 0)

		await request(api.quicksave, {
			method: 'POST',
			data: {
				data,
				delete: delete_ids,
				query
			}
		})

		close()

		message.success('保存成功')

		getData()
		props.searchFormData?.()
	}

	useEffect(() => {
		if (
			props?.name &&
			props?.queryDataSource &&
			Object.keys(props.queryDataSource).length
		) {
			getSetting()
			getData()
		}
	}, [props])

	const columns = useColumns(setting)

	return (
		<div className={styles._local}>
			<div className={clsx(['quick_table_wrap w_100', props?.chart?.position])}>
				<div
					className='table_content'
					style={{
						width:
							props?.chart?.position === 'left' ||
							props?.chart?.position === 'right'
								? `calc(100% - ${props?.chart?.width || 0}px)`
								: '100%'
					}}
				>
					<div className='table_title_wrap flex justify_between align_center'>
						<span className='table_title'>{props.label}</span>
					</div>
					{data.map((item, index) => (
						<div className='table_item flex' key={index}>
							<Row className='table_row' gutter={12}>
								{columns.map((it: any, idx: number) => {
									const { value, ...props_no_value } =
										it.edit.props

									if (
										it.edit.type === 'input' ||
										it.edit.type === 'inputNumber'
									) {
										props_no_value['onBlur'] = (v: any) =>
											onChange(index, {
												[it.key]: v.target.value
											})
									} else {
										props_no_value['onChange'] = (v: any) =>
											onChange(index, {
												[it.key]: v
											})
									}

									return (
										<Col span={it.width} key={index + idx}>
											<Dynamic
												type='form'
												name={it.edit.type}
												props={{
													...props_no_value,
													name: it.key,
													label: it.title,
													pure: '1',
													value: item[it.key],
													style: {
														width: '100%'
													}
												}}
											></Dynamic>
										</Col>
									)
								})}
							</Row>
							<div className='table_options flex justify_end'>
								<a
									className='btn_option flex justify_center align_center cursor_point clickable'
									onClick={() => add(index)}
								>
									<Icon name='icon-plus' size={20}></Icon>
								</a>
								<a
									className={clsx([
										'btn_option flex justify_center align_center cursor_point clickable',
										data.length === 1 && 'disabled'
									])}
									onClick={() => remove(index)}
								>
									<Icon name='icon-x-circle' size={18}></Icon>
								</a>
							</div>
						</div>
					))}
				</div>
				{props?.chart && (
					<div className='table_chart_wrap flex flex_column'>
						<div className='table_title_wrap flex justify_between align_center opacity_0'>
							<span className='table_title'>{props.label}</span>
						</div>
						<Card
							className='table_chart'
							width={
								props.chart.position === 'left' ||
								props.chart.position === 'right'
									? props.chart.width
									: '100%'
							}
							height={props.chart.props.height + 48}
						>
							<Dynamic
								type='chart'
								name={props.chart.type}
								props={{
									name: props.label,
									data: raw_data,
									...props.chart.props
								}}
							></Dynamic>
						</Card>
					</div>
				)}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
