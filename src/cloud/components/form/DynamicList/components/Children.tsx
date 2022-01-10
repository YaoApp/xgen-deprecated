import { useDynamicList } from 'ahooks'
import { Row } from 'antd'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import { Icon } from '@/components'

import Child from './Child'

interface IProps {
	type: string
	columns: Array<any>
	item: any
	item_key: number
	onChange: (key: number, v: any) => void
}

const Index = (props: IProps) => {
	const { type, columns, item, item_key, onChange: onChangeParent } = props

	const { list, remove, getKey, getIndex, insert, replace } = useDynamicList(
		(item?.children?.length ? item.children : [{}]) as Array<any>
	)
	const ref_list = useRef<Array<any>>()

	useEffect(() => {
		ref_list.current = list
	}, [list])

	const add = (index: number) => {
		const item: any = {}

		insert(index + 1, item)
	}

	const del = (index: number) => {
		remove(index)
	}

	const onChange = (child_key: number, v: any) => {
		const index = getIndex(child_key)

		const child_item = {
			...list[index],
			...v
		}

		replace(index, child_item)

		onChangeParent(item_key, {
			...item,
			children: ref_list.current
		})
	}

	return (
		<div className='children_wrap'>
			{list.map((item: any, index) => (
				<div className='table_item children_row flex' key={getKey(index)}>
					<Row className='table_row' gutter={12}>
						{columns.map((it: any, idx: number) => (
							<Child
								{...{ item, it, onChange }}
								item_key={getKey(index)}
								col_key={idx}
								key={getKey(index) + idx}
							></Child>
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
			))}
		</div>
	)
}

export default window.$app.memo(Index)
