import { useState, useEffect } from 'react'
import { Row, Col, Input, Select, Button, Tooltip } from 'antd'
import clsx from 'clsx'
import { Icon } from '@/components'
import styles from './index.less'

const { Option } = Select

const Index = () => {
	const [visible_more, setVisibleMore] = useState(false)
	const [display_more, setDisplayMore] = useState(false)
	const [opacity_more, setOpacityMore] = useState(false)

	useEffect(() => {
		if (visible_more) {
			setDisplayMore(true)

			setTimeout(() => {
				setOpacityMore(true)
			}, 0)
		} else {
			setOpacityMore(false)

			const timer = setTimeout(() => {
				setDisplayMore(false)
			}, 300)

			return () => clearTimeout(timer)
		}
	}, [visible_more])

	return (
		<div className={styles._local}>
			<Row gutter={16} style={{ marginBottom: 20 }}>
				<Col span={4}>
					<Input
						className='w_100'
						type='text'
						placeholder='输入关键词'
						prefix={<Icon name='icon-search' size={15}></Icon>}
					></Input>
				</Col>
				<Col span={4}>
					<Select className='w_100' placeholder='请选择错误类型'>
						<Option value={1}>系统错误</Option>
						<Option value={2}>网络延时</Option>
						<Option value={3}>代码错误</Option>
					</Select>
				</Col>
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
				<Col span={1} offset={8}>
					{!visible_more && (
						<Tooltip title='更多筛选项'>
							<Button
								className='no_text w_100 flex justify_center align_center'
								icon={<Icon name='icon-filter' size={15}></Icon>}
								onClick={() => setVisibleMore(true)}
							></Button>
						</Tooltip>
					)}
				</Col>
				<Col span={3}>
					<Button
						className='w_100 flex justify_center align_center'
						type='primary'
						icon={<Icon name='icon-plus' size={15}></Icon>}
					>
						创建报告
					</Button>
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
				<Row gutter={16} style={{ marginBottom: 16 }}>
					<Col span={6}>
						<Input
							className='w_100'
							type='text'
							placeholder='输入关键词'
							prefix={<Icon name='icon-search' size={15}></Icon>}
						></Input>
					</Col>
					<Col span={6}>
						<Select className='w_100' placeholder='请选择错误类型'>
							<Option value={1}>系统错误</Option>
							<Option value={2}>网络延时</Option>
							<Option value={3}>代码错误</Option>
						</Select>
					</Col>
					<Col span={6}>
						<Input
							className='w_100'
							type='text'
							placeholder='输入关键词'
							prefix={<Icon name='icon-search' size={15}></Icon>}
						></Input>
					</Col>
					<Col span={6}>
						<Select className='w_100' placeholder='请选择错误类型'>
							<Option value={1}>系统错误</Option>
							<Option value={2}>网络延时</Option>
							<Option value={3}>代码错误</Option>
						</Select>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
