import { useParams, history } from 'umi'
import { Popover } from 'antd'
import { Icon } from '@/components'
import moment from 'moment'

export const useColumns = (setting: any) => {
	if (!setting.filters) return []

	const params = useParams<{ name: string }>()

	const _columns = setting.columns
	const _layouts = setting.list.layout.columns

	const columns = _layouts.reduce((total: Array<any>, item: any) => {
		const _item = {
			..._columns[item.name],
			title: item.name
		}

		_item.dataIndex = _columns[_item.title].view.props.value.replace(':', '')

		if (_item.title.indexOf('时间') !== -1) {
			_item.render = (v: string) =>
				v
					? moment(v).format(
							_columns[_item.title].view.props['datetime-format']
					  )
					: '-'
		} else if (_item.dataIndex.indexOf('.') !== -1) {
			const indexs = _item.dataIndex.split('.')

			_item.render = (_: any, item: any) => {
				return indexs.reduce((total: any, it: any) => {
					total = total[it]

					return total
				}, item)
			}
		} else {
			_item.render = (v: any) => v || '-'
		}

		total.push(_item)

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
										pathname: `/form/${params.name}?id=${item.id}`
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
}
