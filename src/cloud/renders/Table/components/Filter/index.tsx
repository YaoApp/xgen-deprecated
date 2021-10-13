import { Button, Col, Dropdown, Form, Menu, Row } from 'antd'
import clsx from 'clsx'
import { useEffect } from 'react'
import { getDvaApp, history, useParams } from 'umi'

import Dynamic from '@/cloud/core'
import { Icon } from '@/components'

import { useFilters, useVisibleMore } from './hooks'
import styles from './index.less'

const { useForm } = Form

const Index = ({ setting, batch, selected, setBatch, setVisibleModal }: any) => {
	const params = useParams<{ name: string }>()
	const [form] = useForm()
	const { getFieldsValue, setFieldsValue, resetFields } = form
	const { display_more, opacity_more, setVisibleMore } = useVisibleMore()
	const filters = useFilters(setting)
	const query = history.location.query

	useEffect(() => {
		if (!Object.keys(query as any).length) return resetFields()

		setFieldsValue(query)
	}, [query])

	const onFinish = (v: any) => {
		history.push({
			pathname: history.location.pathname,
			query: {
				...query,
				...v
			}
		})
	}

	const onReset = () => {
		resetFields()
		onFinish(getFieldsValue())
	}

	return (
		<Form
			className={styles._local}
			form={form}
			name={`form_filter_${history.location.pathname}`}
			onFinish={onFinish}
			onReset={onReset}
		>
			<Row gutter={16} justify='space-between' style={{ marginBottom: 20 }}>
				{filters.map((item: any, index: number) => (
					<Col span={item.span} key={index}>
						<Dynamic
							category='components'
							type='form'
							props={{
								type: item.input.type,
								props: {
									...item.input.props,
									name: item.bind,
									label: item.label,
									string: '1'
								}
							}}
						></Dynamic>
					</Col>
				))}
				<Col span={2}>
					<Button
						className='w_100 flex justify_center align_center'
						type='primary'
						htmlType='submit'
					>
						搜索
					</Button>
				</Col>
				<Col span={2}>
					<Button
						className='w_100 flex justify_center align_center'
						htmlType='reset'
					>
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
						{batch ? (
							<div className='flex'>
								<Button
									className='btn_confirm flex justify_center align_center mr_16'
									type='primary'
									icon={
										<Icon
											className='transition_normal'
											name='icon-check-circle'
											size={15}
										></Icon>
									}
									disabled={!selected.length}
									onClick={() => setVisibleModal(true)}
								>
									选择并操作
								</Button>
								<Button
									className='btn_confirm flex justify_center align_center mr_16'
									onClick={() => setBatch(false)}
								>
									取消选择
								</Button>
							</div>
						) : (
							setting.list?.option?.batch && (
								<Button
									className='btn_normal flex justify_center align_center mr_16'
									type='default'
									icon={
										<Icon
											className='transition_normal'
											name='icon-align-right'
											size={15}
										></Icon>
									}
									onClick={() => setBatch(true)}
								>
									批量管理
								</Button>
							)
						)}
						<Dropdown.Button
							className='btn_add flex justify_center align_center'
							type='primary'
							onClick={() => {
								getDvaApp()._store.dispatch({
									type: 'app/updateState',
									payload: { visible_menu: false }
								})

								history.push({
									pathname: `/form/${params.name}/0`
								})
							}}
							overlay={
								<Menu>
									<Menu.Item key='1'>1st item</Menu.Item>
									<Menu.Item key='2'>2nd item</Menu.Item>
									<Menu.Item key='3'>3rd item</Menu.Item>
								</Menu>
							}
							trigger={['click']}
						>
							{setting.list.actions.create.props.label}
						</Dropdown.Button>
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
		</Form>
	)
}

export default window.$app.memo(Index)
