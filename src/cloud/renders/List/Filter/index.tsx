import { Row, Col, Button, Tooltip } from 'antd'
import clsx from 'clsx'
import { Icon } from '@/components'
import Dynamic from '@/cloud/core'
import { useVisibleMore, useFilters } from './hooks'
import styles from './index.less'

const Index = ({ data }: any) => {
	const { visible_more, display_more, opacity_more, setVisibleMore } = useVisibleMore()
	const filters = useFilters(data)

	return (
		<div className={styles._local}>
			<Row gutter={16} justify='space-between' style={{ marginBottom: 20 }}>
				{filters.map((item: any, index: number) => (
					<Col span={item.span} key={index}>
						<Dynamic
							category='components'
							type='form'
							props={{
								type: item.input.type,
								props: item.input.props
							}}
						></Dynamic>
					</Col>
				))}
				<Col span={2}>
					<Button
						className='w_100 flex justify_center align_center'
						type='primary'
					>
						搜索
					</Button>
				</Col>
				<Col span={2}>
					<Button className='w_100 flex justify_center align_center'>
						重置
					</Button>
				</Col>
				{/* <Col span={1} offset={8}>
					{false && (
						<Tooltip title='更多筛选项'>
							<Button
								className='no_text w_100 flex justify_center align_center'
								icon={<Icon name='icon-filter' size={15}></Icon>}
								onClick={() => setVisibleMore(true)}
							></Button>
						</Tooltip>
					)}
				</Col> */}
				<Col flex='auto'>
					<div className='flex justify_end'>
						<Button
							className='btn_add w_100 flex justify_center align_center'
							type='primary'
							icon={<Icon name='icon-plus' size={15}></Icon>}
						>
							{data.list.actions.create.props.label}
						</Button>
					</div>
				</Col>
			</Row>
			<div
				className={clsx([
					'more_wrap w_100 border_box flex_column transition_normal',
					opacity_more ? 'opacity' : '',
					display_more ? 'display' : ''
				])}
			>
				<div className='title_wrap w_100 border_box flex justify_between align_center'>
					<span className='title'>更多筛选项</span>
					<a
						className='icon_wrap flex justify_center align_center transition_normal cursor_point clickable'
						onClick={() => setVisibleMore(false)}
					>
						<Icon name='icon-x' size={20}></Icon>
					</a>
				</div>
				<Row gutter={16} style={{ marginBottom: 16 }}></Row>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
