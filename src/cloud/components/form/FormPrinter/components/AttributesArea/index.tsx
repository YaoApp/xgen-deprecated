import { Button, Form, Input } from 'antd'
import Shadow from 'react-shadow'

import styles from './index.less'

import type { IPropsAttributesArea } from '../../types'

const { Item } = Form

const Index = (props: IPropsAttributesArea) => {
	const { current_widget, setCurrentWidget } = props

	console.log(current_widget)

	const onFinish = (values: any) => {
		console.log(values)
	}

	return (
		current_widget && (
			<Shadow.div className={styles._local}>
				<Form
					name='form_printer'
					initialValues={current_widget}
					onFinish={onFinish}
				>
					<Item className='item_wrap' name='id'>
						<Input disabled></Input>
					</Item>
					<Button type='primary' htmlType='submit'>
						确认
					</Button>
				</Form>
				<link rel='stylesheet' href='/antd.min.css' />
			</Shadow.div>
		)
	)
}

export default window.$app.memo(Index)
