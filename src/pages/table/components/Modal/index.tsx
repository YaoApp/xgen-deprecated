import { Button, Checkbox, Col, Form, Modal, Row } from 'antd'
import { cloneDeep, pickBy } from 'lodash-es'

import Dynamic from '@/cloud/core'

import { useOptions } from './hooks'
import styles from './index.less'

import type { ModalProps } from 'antd'

const { confirm } = Modal
const { useForm } = Form

interface IProps extends ModalProps {
	setting: any
	setVisibleModal: (v: boolean) => void
	onBatchDelete: () => void
	onBatchUpdate: (data: any) => void
}

const Index = (props: IProps) => {
	const { setting, setVisibleModal, onBatchDelete, onBatchUpdate } = props
	const { options, setOptions } = useOptions(setting)
	const [form] = useForm()
	const { getFieldsValue } = form

	const onChange = (index: number, checked: boolean) => {
		const _options = cloneDeep(options)

		_options[index].checked = checked

		setOptions(_options)
	}

	const onOk = () => {
		const v = pickBy(getFieldsValue())

		if (!Object.keys(v).length) return

		onBatchUpdate(v)
	}

	const Footer = (
		<div className='flex w_100 justify_between'>
			<div className='left_options'>
				{setting.list.option?.batch?.delete && (
					<Button
						danger
						onClick={() =>
							confirm({
								title: '确认进行批量删除',
								content: '删除之后数据不可恢复，请谨慎操作！',
								centered: true,
								onOk() {
									onBatchDelete()
								}
							})
						}
					>
						批量删除
					</Button>
				)}
			</div>
			<div className='right_options'>
				<Button onClick={() => setVisibleModal(false)}>取消</Button>
				<Button type='primary' onClick={onOk}>
					确定
				</Button>
			</div>
		</div>
	)

	return (
		<Modal
			{...props}
			className={styles.modal_batch}
			title='批量编辑'
			centered
			onCancel={() => setVisibleModal(false)}
			footer={Footer}
		>
			<div className='select_wrap w_100 border_box flex flex_wrap'>
				{options.map((item, index) => (
					<Checkbox
						key={item.label}
						onChange={({ target: { checked } }) => onChange(index, checked)}
					>
						{item.label}
					</Checkbox>
				))}
			</div>
			<Form className='form_batch' name={`form_batch_${setting.name}`} form={form}>
				<Row gutter={16} wrap={true}>
					{options.map(
						(item: any, index: number) =>
							item.checked && (
								<Col span={item.span} key={index}>
									<Dynamic
										type='form'
										name={item.edit.type}
										props={{
											...item.edit.props,
											name: item.edit.props.value,
											label: item.label
										}}
									></Dynamic>
								</Col>
							)
					)}
				</Row>
			</Form>
		</Modal>
	)
}

export default window.$app.memo(Index)
