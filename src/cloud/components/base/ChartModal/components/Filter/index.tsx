import { Button, Col, Form, Row } from 'antd'
import { history } from 'umi'

import Dynamic from '@/cloud/core'

import { useFilters } from './hooks'
import styles from './index.less'

const { useForm } = Form

const Index = ({ setting, setQuery }: any) => {
	const [form] = useForm()
	const { getFieldsValue, resetFields } = form
	const filters = useFilters(setting)

	const onFinish = (v: any) => {
		setQuery(v)
	}

	const onReset = () => {
		resetFields()
		onFinish(getFieldsValue())
	}

	return (
		<Form
			className={styles._local}
			form={form}
			name={`custom_modal_filter_${history.location.pathname}`}
			onFinish={onFinish}
			onReset={onReset}
		>
			<Row gutter={16} wrap={true} style={{ margin: 0, marginBottom: 20 }}>
				{filters.map((item: any, index: number) => (
					<Col span={item.span} key={index}>
						<Dynamic
							type='form'
							name={item.input.type}
							props={{
								...item.input.props,
								name: item.bind,
								label: item.label,
								string: '1'
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
						查询
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
			</Row>
		</Form>
	)
}

export default window.$app.memo(Index)
