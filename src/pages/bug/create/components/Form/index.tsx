import { useState } from 'react'
import { Button, Row, Col, Form, Input, InputNumber, Select, Affix } from 'antd'
import clsx from 'clsx'
import { Icon } from '@/components'
import styles from './index.less'

const { Item } = Form
const { Option } = Select

const Index = () => {
	const [stick, setStick] = useState<boolean | undefined>(false)

	return (
		<div className={styles._local}>
			<div className='form_title_wrap w_100 border_box flex justify_between align_center'>
				<span className='title'>创建报告</span>
				<Affix offsetTop={11} style={{ zIndex: 101 }} onChange={(v) => setStick(v)}>
					<div
						className={clsx([
							'action_items flex transition_normal',
							stick ? 'stick' : ''
						])}
					>
						<Button
							className={clsx([
								'btn_action btn_normal btn_back',
								stick ? 'stick' : ''
							])}
							icon={<Icon name='icon-arrow-left' size={15}></Icon>}
						>
							返回
						</Button>
						<Button className='btn_action btn_confirm' type='primary'>
							保存
						</Button>
					</div>
				</Affix>
			</div>
			<Form className='form_wrap w_100 border_box flex flex_column'>
				<div className='form_item w_100 border_box flex flex_column'>
					<span className='form_item_title'>服务类型资料</span>
					<Row gutter={16}>
						<Col span={12}>
							<Item label='名称'>
								<Input
									prefix={
										<Icon name='icon-user' size={15}></Icon>
									}
									placeholder='输入服务名称'
								></Input>
							</Item>
						</Col>
						<Col span={12}>
							<Item label='父类型'>
								<Select placeholder='选择父类型'>
									<Option value={0}>0</Option>
									<Option value={1}>1</Option>
									<Option value={2}>2</Option>
								</Select>
							</Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Item label='状态'>
								<Select placeholder='选择状态'>
									<Option value={1}>开启</Option>
									<Option value={0}>关闭</Option>
								</Select>
							</Item>
						</Col>
						<Col span={12}>
							<Item label='查询排序'>
								<InputNumber placeholder='输入查询排序'></InputNumber>
							</Item>
						</Col>
					</Row>
				</div>
				<div className='form_item w_100 border_box flex flex_column'>
					<span className='form_item_title'>API接口</span>
					<Row gutter={16}>
						<Col span={24}>
							<Item label='API Key'>
								<Input placeholder='输入API Key'></Input>
							</Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Item label='API Secret'>
								<Input placeholder='输入API Secret'></Input>
							</Item>
						</Col>
					</Row>
				</div>
				<div className='actions_wrap danger w_100 border_box flex flex_column'>
					<div className='actions_title_wrap flex flex_column'>
						<span className='section_title'>危险操作</span>
						<span className='desc'>请谨慎使用下列功能</span>
					</div>
					<div className='action_items flex flex_column'>
						<div className='action_item w_100 border_box flex justify_between'>
							<div className='left_wrap flex flex_column'>
								<span className='title'>删除数据</span>
								<span className='desc'>
									此操作将删除本条数据，这可能会影响关联数据分析结果。
								</span>
							</div>
							<Button className='btn_normal'>删除</Button>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default window.$app.memo(Index)
