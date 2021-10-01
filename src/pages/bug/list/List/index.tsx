import { Table, Popover, Tag, Input } from 'antd'
import { Icon } from '@/components'
import styles from './index.less'
import type { IPropsList } from '../type'

const Index = (props: IPropsList) => {
	const { list } = props

	const columns = [
		{
			title: '标题',
			dataIndex: 'title',
			width: 400,
			render: (v: string) => (
				<Popover
					className='td_popover'
					placement='top'
					trigger='click'
					destroyTooltipOnHide={{ keepParent: false }}
					content={
						<Input
							defaultValue={v}
							addonAfter={<Icon name='icon-check' size={13}></Icon>}
							style={{ width: 240, backgroundColor: 'transparent' }}
						></Input>
					}
				>
					<span className='line_clamp_1'>{v}</span>
				</Popover>
			)
		},
		{
			title: '提问者',
			dataIndex: 'person'
		},
		{
			title: '回复数量',
			dataIndex: 'reply'
		},
		{
			title: '状态',
			dataIndex: 'open',
			render: (v: boolean) => (
				<Tag color={v ? '#41b883' : '#f50'}>{v ? '开启' : '已关闭'}</Tag>
			)
		},
		{
			title: '标签',
			dataIndex: 'tag'
		},
		{
			title: '创建时间',
			dataIndex: 'create_at'
		},
		{
			title: '操作',
			key: 'operation',
			render: (_: any, item: any) => (
				<div className='flex justify_end'>
					<Popover
						overlayClassName='options_popover'
						placement='bottomRight'
						trigger='click'
						destroyTooltipOnHide={{ keepParent: false }}
						content={
							<div className='table_option_items flex flex_column'>
								<div className='table_option_item flex align_center cursor_point'>
									<Icon name='icon-eye' size={13}></Icon>
									<span className='text'>查看</span>
								</div>
								<div className='table_option_item flex align_center cursor_point'>
									<Icon name='icon-edit' size={13}></Icon>
									<span className='text'>编辑</span>
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
		}
	]

	return (
		<div className={styles._local}>
			<Table
				dataSource={list}
				columns={columns}
				sticky={{ offsetHeader: 52 }}
				rowKey={(item) => item.id}
				pagination={{
					showSizeChanger: true
				}}
			/>
		</div>
	)
}

export default window.$app.memo(Index)
