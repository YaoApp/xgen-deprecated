import { Button, Form, Popover } from 'antd'
import { hidePopover } from 'R/src/utils/helpers/dom'
import { useMemo } from 'react'

import { CheckOutlined } from '@ant-design/icons'

import Inputs from './Inputs'
import Text from './Text'

interface IProps {
	cell: Array<any>
	rows: Array<any>
	tag: string
	parent_index: number
	tag_index: number
	tag_rows_index?: number
	day_index: number
	options: Array<any>
	onChange: any
}

const Index = (props: IProps) => {
	const {
		cell,
		rows,
		tag,
		parent_index,
		tag_index,
		tag_rows_index,
		day_index,
		options,
		onChange
	} = props

	const value = useMemo(() => {
		const v = rows[parent_index].children[tag_index]?.value

		if (!v) return

		if (tag_rows_index === undefined) {
			return v[day_index]
		} else {
			if (!v[tag_rows_index]) return undefined

			return v[tag_rows_index][day_index]
		}
	}, [rows, parent_index, tag_index, tag_rows_index, day_index])

	return (
		<Popover
			id='dynamic_list_td_popover'
			overlayClassName='td_popover dynamic_list'
			placement='topLeft'
			trigger='click'
			destroyTooltipOnHide={{ keepParent: false }}
			content={
				<Form
					className='w_100 flex'
					name='schedule_cell'
					initialValues={value}
					onFinish={(v) => {
						onChange(
							{
								parent_index,
								tag_index,
								tag_rows_index,
								day_index
							},
							v
						)
						hidePopover('dynamic_list_td_popover')
					}}
				>
					<Inputs cell={cell} tag={tag}></Inputs>
					<Button
						className='ml_12'
						type='primary'
						htmlType='submit'
						icon={<CheckOutlined></CheckOutlined>}
					></Button>
				</Form>
			}
		>
			<div className='td border_box flex justify_center align_center'>
				{cell.map((item: any, index: number) => {
					const key = item.props.value.replace(':', '')

					return value && value[key] !== undefined ? (
						<Text
							config={item}
							options={options}
							value={value ? value[key] : ''}
							key={index}
						></Text>
					) : (
						''
					)
				})}
			</div>
		</Popover>
	)
}

export default window.$app.memo(Index)
