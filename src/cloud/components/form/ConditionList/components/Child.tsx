import { Button, Col, Form, Popover } from 'antd'
import clsx from 'clsx'
import moment from 'moment'

import Dynamic from '@/cloud/core'
import { CheckOutlined } from '@ant-design/icons'

interface IPropsItem {
	item: any
	it: any
	item_key: number
	col_key: number
	onChange: (index: number, v: any) => void
}

const Index = (props: IPropsItem) => {
	const { item, it, item_key, col_key, onChange } = props
	const { value, ...props_no_value } = it.props
	const v_key = it.props.value.replace(':', '')
	const form_value =
		it.type === 'datePicker' && item[v_key]
			? moment(item[v_key], it.props.format || 'YYYY年MM月DD日 hh:mm:ss')
			: item[v_key]

	const change = (v: any) => {
		if (it.type === 'datePicker') {
			const target_value = v[Object.keys(v)[0]]
			const filter_value = moment.isMoment(target_value)
				? moment(target_value).format(it.props.format || 'YYYY年MM月DD日 hh:mm:ss')
				: v

			onChange(item_key, { [v_key]: filter_value })
		} else {
			onChange(item_key, v)
		}
	}

	return (
		<Col span={it.width}>
			<Popover
				id='dynamic_list_td_popover'
				overlayClassName='td_popover dynamic_list'
				placement='topLeft'
				trigger='click'
				destroyTooltipOnHide={{ keepParent: false }}
				content={
					<Form
						className='w_100 flex'
						name={`quick_table_td_${item_key}_${col_key}`}
						initialValues={{
							[v_key]: form_value
						}}
						onFinish={(v) => change(v)}
					>
						<Dynamic
							type='form'
							name={it.type}
							props={{
								...props_no_value,
								name: v_key,
								label: it.title,
								value: form_value,
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
				<div
					className={clsx([
						'td_text w_100 border_box h_100 flex align_center',
						!item[v_key] && 'empty'
					])}
				>
					<span className='text'>
						{item[v_key] !== undefined ? item[v_key] : it.props.placeholder}
					</span>
				</div>
			</Popover>
		</Col>
	)
}

export default window.$app.memo(Index)
