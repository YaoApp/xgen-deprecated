import { useDynamicList } from 'ahooks'
import { Col, message, Row } from 'antd'
import qs from 'query-string'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { request } from 'umi'

import Dynamic from '@/cloud/core'
import { Icon } from '@/components'
import { getDeepValue } from '@/utils/helpers/filters'

import { useColumns } from './hooks'
import styles from './index.less'

interface IProps {
	name: string
	type: string
	label: string
	query?: any
	queryDataSource?: any
	update_form?: boolean
	searchFormData?: () => void
}

interface IPropsList {
	label: string
	data: Array<any>
	columns: Array<any>
	onSave: (list: Array<any>, delete_ids: Array<number>) => void
}

interface IPropsItem {
	item: any
	it: any
	index: number
	onChange: (index: number, v: any) => void
}

const Item = (props: IPropsItem) => {
	const { item, it, index, onChange } = props
	const { value, ...props_no_value } = it.edit.props

	const change = useCallback(
		(v: any) => {
			onChange(index, {
				[it.key]: typeof v == 'object' ? v.target.value : v
			})
		},
		[item]
	)

	if (it.edit.type === 'input' || it.edit.type === 'inputNumber') {
		props_no_value['onBlur'] = change
	} else {
		props_no_value['onChange'] = change
	}

	return (
		<Col span={it.width}>
			<Dynamic
				type='form'
				name={it.edit.type}
				props={{
					...props_no_value,
					name: it.key,
					label: it.title,
					pure: '1',
					value: item[it.key],
					style: { width: '100%' }
				}}
			></Dynamic>
		</Col>
	)
}

const List = (props: IPropsList) => {
	const { label, data, columns, onSave } = props
	const { list, remove, getKey, insert, replace } = useDynamicList(data)
	const [delete_ids, setDeleteIds] = useState<Array<number>>([])

	const add = (index: number) => {
		const item: any = {}

		columns.map((it: any) => {
			item[it['key']] = undefined
		})

		insert(index + 1, item)
	}

	const del = (index: number) => {
		remove(index)

		if (list[index]?.id) {
			delete_ids.push(list[index].id)

			setDeleteIds(delete_ids)
		}
	}

	const onChange = (index: number, v: any) => {
		const item = {
			...list[index],
			...v
		}

		replace(index, item)
	}

	return (
		<Fragment>
			<div className='table_title_wrap flex justify_between align_center'>
				<span className='table_title'>{label}</span>
				<div className='flex'>
					{data.length === 0 && (
						<a className='btn_save cursor_point clickable mr_12'>新增</a>
					)}
					<a
						className='btn_save cursor_point clickable'
						onClick={() => {
							onSave(list, delete_ids)
							setDeleteIds([])
						}}
					>
						保存
					</a>
				</div>
			</div>
			{list.map((item: any, index) => (
				<div className='table_item flex' key={getKey(index)}>
					<Row className='table_row' gutter={12}>
						{columns.map((it: any, idx: number) => (
							<Item
								{...{ item, it, index, onChange }}
								key={getKey(index) + idx}
							></Item>
						))}
					</Row>
					<div className='table_options flex justify_end'>
						<a
							className='btn_option flex justify_center align_center cursor_point clickable'
							onClick={() => add(index)}
						>
							<Icon name='icon-plus' size={20}></Icon>
						</a>
						<a
							className='btn_option flex justify_center align_center cursor_point clickable'
							onClick={() => del(index)}
						>
							<Icon name='icon-x-circle' size={18}></Icon>
						</a>
					</div>
				</div>
			))}
		</Fragment>
	)
}

const Index = (props: IProps) => {
	const [setting, setSetting] = useState<any>({})
	const [data, setData] = useState<Array<any>>([])
	const [query, setQuery] = useState<any>({})

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

		return
	}

	const getSetting = async () => {
		const data = await request(api.setting)

		setSetting(data)
	}

	const onSave = async (list: Array<any>, delete_ids: Array<number>) => {
		const close = message.loading('loading', 0)

		await request(api.quicksave, {
			method: 'POST',
			data: {
				data: list,
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
			<div className='quick_table_wrap w_100'>
				{data.length && columns.length && (
					<List {...{ data, columns, onSave }} label={props.label}></List>
				)}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
