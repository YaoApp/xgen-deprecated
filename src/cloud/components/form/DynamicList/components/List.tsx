import { useDynamicList } from 'ahooks'
import { Empty, Row } from 'antd'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'

import { Icon } from '@/components'
import { hidePopover } from '@/utils/helpers/dom'

import { useColumns } from '../hooks'
import Children from './Children'
import ListItem from './ListItem'

interface IPropsList {
	type: string
	setting: any
	label: string
	data: Array<any>
	query: any
	trigger: any
}

const Index = (props: IPropsList) => {
	const { type, label, setting, data, query, trigger } = props
	const { list, remove, getKey, getIndex, insert, replace } = useDynamicList(data)
	const [delete_ids, setDeleteIds] = useState<Array<number>>([])

	const { columns, children_columns } = useColumns(setting)

	useEffect(() => {
		trigger({ data: list, delete: delete_ids, query })
	}, [list, delete_ids, query])

	const add = (index: number) => {
		const item: any = {}

		insert(index + 1, item)
	}

	const del = (index: number) => {
		remove(index)

		if (list[index]?.id) {
			delete_ids.push(list[index].id)

			setDeleteIds(delete_ids)
		}
	}

	const onChange = (key: number, v: any) => {
		const index = getIndex(key)

		const item = {
			...list[index],
			...v
		}

		replace(index, item)

		hidePopover('dynamic_list_td_popover')
	}

	return (
		<Fragment>
			<div className='table_title_wrap flex justify_between align_center'>
				<span className='table_title'>{label}</span>
				<div className='flex'>
					{type !== 'view' && (
						<a
							className='btn_save cursor_point clickable'
							onClick={() => add(-1)}
						>
							新增
						</a>
					)}
				</div>
			</div>
			{list.length !== 0 ? (
				list.map((item: any, index) => (
					<div className='table_item_wrap flex flex_column' key={getKey(index)}>
						<div className='table_item flex'>
							<Row className='table_row' gutter={12}>
								{columns.map((it: any, idx: number) => (
									<ListItem
										{...{ item, it, onChange }}
										item_key={getKey(index)}
										col_key={idx}
										key={getKey(index) + idx}
									></ListItem>
								))}
							</Row>
							<div
								className={clsx([
									'table_options flex justify_end',
									type === 'view' && 'disabled'
								])}
							>
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
						{children_columns && children_columns.length !== 0 && (
							<div className='table_children_wrap w_100 border_box'>
								<Children
									columns={children_columns}
									type={type}
									item={item}
									item_key={getKey(index)}
									onChange={onChange}
								></Children>
							</div>
						)}
					</div>
				))
			) : (
				<div className='empty_wrap w_100 flex justify_center align_center'>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
				</div>
			)}
		</Fragment>
	)
}

export default window.$app.memo(Index)
