import { useState, useEffect } from 'react'
import { history, getDvaApp, useParams } from 'umi'
import { Button, Row, Col, Form, Affix, Modal } from 'antd'
import clsx from 'clsx'
import { Icon } from '@/components'
import Dynamic from '@/cloud/core'
import { useFieldset } from './hooks'
import styles from './index.less'
import type { IModelApp } from 'umi'

const { useForm } = Form
const { confirm } = Modal

const Index = ({ setting = {}, data = {} }: any) => {
	const params = useParams<{ name: string; id: string }>()
	const [form] = useForm()
	const [stick, setStick] = useState<boolean | undefined>(false)
	const fieldset = useFieldset(setting)
	const dispatch = getDvaApp()._store.dispatch

	useEffect(() => {
		if (params.id === '0') return
	}, [params.id])

	const onFinish = (v: any) => {
		dispatch({
			type: `${history.location.pathname}/save`,
			payload: { name: params.name, data: v }
		})
	}

	return (
		<Form
			className={styles._local}
			form={form}
			name={`form_filter_${history.location.pathname}`}
			onFinish={onFinish}
		>
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
							onClick={() => {
								dispatch({
									type: 'app/updateState',
									payload: { visible_menu: true } as IModelApp
								})

								history.goBack()
							}}
						>
							返回
						</Button>
						<Button
							className='btn_action btn_confirm'
							type='primary'
							htmlType='submit'
						>
							保存
						</Button>
					</div>
				</Affix>
			</div>
			<div className='form_wrap w_100 border_box flex flex_column'>
				{fieldset.map((item, index) => (
					<div
						className='form_item w_100 border_box flex flex_column'
						key={index}
					>
						<div className='form_item_title_wrap flex flex_column'>
							<span className='section_title'>{item.title}</span>
							<span className='desc'>{item.description}</span>
						</div>
						<Row gutter={16} wrap={true}>
							{item.columns.map((it: any, idx: number) => (
								<Col span={it.span} key={idx}>
									<Dynamic
										category='components'
										type='form'
										props={{
											type: it.edit.type,
											props: {
												...it.edit.props,
												name: it.edit.props.value,
												label: it.label
											}
										}}
									></Dynamic>
								</Col>
							))}
						</Row>
					</div>
				))}
				{setting.edit.actions.delete.type && (
					<div className='actions_wrap danger w_100 border_box flex flex_column'>
						<div className='form_item_title_wrap flex flex_column'>
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
								<Button
									className='btn_normal'
									onClick={() =>
										confirm({
											title: '确认删除',
											content: '删除之后数据不可恢复，请谨慎操作！',
											centered: true,
											onOk() {
												console.log('ok')
											}
										})
									}
								>
									删除
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</Form>
	)
}

export default window.$app.memo(Index)
