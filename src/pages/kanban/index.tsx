import { Col, Row } from 'antd'

import { data_indicator } from '@/_data_/kanban'
import { Page } from '@/components'

import BarChart from './components/BarChart'
import NumberChart from './components/NumberChart'
import PieChart from './components/PieChart'
import styles from './index.less'

const Index = () => {
	const props_NumberChart_1 = {
		data: data_indicator,
		primary: 'value',
		title: '可用率',
		color: '#41b883',
		unit: '%'
	}

	const props_NumberChart_2 = {
		data: data_indicator,
		primary: 'value',
		title: '平均响应时间',
		color: '#029ce5',
		unit: 'ms'
	}

	const props_NumberChart_3 = {
		data: data_indicator,
		primary: 'value',
		title: '最小响应时间',
		color: '#8169b1',
		unit: 'ms'
	}

	const props_NumberChart_4 = {
		data: data_indicator,
		primary: 'value',
		title: '最大响应时间',
		color: '#787bf2',
		unit: 'ms'
	}

	return (
		<Page className={styles._local} title='数据看板'>
			<Row gutter={20} wrap>
				<Col span={6}>
					<NumberChart {...props_NumberChart_1}></NumberChart>
				</Col>
				<Col span={6}>
					<NumberChart {...props_NumberChart_2}></NumberChart>
				</Col>
				<Col span={6}>
					<NumberChart {...props_NumberChart_3}></NumberChart>
				</Col>
				<Col span={6}>
					<NumberChart {...props_NumberChart_4}></NumberChart>
				</Col>
				<Col span={12}>
					<BarChart></BarChart>
				</Col>
				<Col span={12}>
					<PieChart></PieChart>
				</Col>
			</Row>
		</Page>
	)
}

export default window.$app.memo(Index)
