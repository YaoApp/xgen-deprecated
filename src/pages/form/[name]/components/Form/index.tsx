import { Affix, Button, Col, Form, Modal, Row } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { history, useParams } from 'umi'

import Dynamic from '@/cloud/core'
import { Icon } from '@/components'

import { useFieldset } from './hooks'
import styles from './index.less'

import type { Dispatch, IModelApp } from 'umi'

const { useForm } = Form
const { confirm } = Modal

interface IProps {
	setting: any
	data: any
	dispatch: Dispatch
}

const Index = ({ setting = {}, data = {}, dispatch }: IProps) => {
	const params = useParams<{ name: string; id: string }>()
	const [form] = useForm()
	const { setFieldsValue, getFieldsValue } = form
	const [stick, setStick] = useState<boolean | undefined>(false)
	const fieldset = useFieldset(setting)

	useEffect(() => {
		if (params.id === '0') return
		if (!Object.keys(data).length) return

		setFieldsValue(data)
	}, [params.id, data])

	const onFinish = (v: any) => {
		console.log(getFieldsValue())

		// const data = params.id === '0' ? v : { ...v, id: params.id }

		// dispatch({
		// 	type: `${history.location.pathname}/save`,
		// 	payload: { name: params.name, data }
		// })
	}

	const onDel = () => {
		dispatch({
			type: `${history.location.pathname}/del`,
			payload: { name: params.name, id: params.id }
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
				<span className='title'>{params.id === '0' ? '创建' : '编辑'}</span>
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
							// htmlType='submit'
							onClick={onFinish}
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
										type='form'
										name={it.edit.type}
										props={{
											...it.edit.props,
											name: it.edit.props.value,
											label: it.label,
											rules: it.rules
										}}
									></Dynamic>
								</Col>
							))}
						</Row>
					</div>
				))}
				{params.id !== '0' && setting.edit.actions.delete.type && (
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
												onDel()
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
