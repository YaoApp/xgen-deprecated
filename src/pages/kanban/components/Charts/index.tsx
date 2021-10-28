import { Col, Radio, Row } from 'antd'
import { cloneDeep } from 'lodash-es'
import { useCallback, useState } from 'react'

import Dynamic from '@/cloud/core'
import { Card } from '@/components'

import { useCharts } from './hooks'
import styles from './index.less'

const { Group } = Radio

const TypeSelect = ({ charts, current_type, index, setCurrentType }: any) => {
	return (
		<Group
			defaultValue={0}
			onChange={({ target: { value } }) => {
				const _current_type = cloneDeep(current_type)

				_current_type[index] = value

				setCurrentType(_current_type)
			}}
		>
			{charts.map((item: any, index: number) => (
				<Radio value={index} key={index}>
					{item.name}
				</Radio>
			))}
		</Group>
	)
}

const Index = ({ setting, data }: any) => {
	const charts = useCharts(setting, data)

	const [current_type, setCurrentType] = useState([])

	const getChartType = useCallback(
		(type, charts, index) => {
			if (!charts) return type

			return charts[current_type[index] || 0].type
		},
		[current_type]
	)

	const getChartProps = useCallback(
		(charts, props, index) => {
			if (!charts) return props

			return charts[current_type[index] || 0].props
		},
		[current_type]
	)

	return (
		<Row className={styles._local} gutter={20} wrap style={{ margin: 0 }}>
			{charts.map((item: any, index: number) => (
				<Col span={item.span} key={index}>
					<Card
						title={item.name}
						scrollMask={item.type === 'table' || item.table}
						options={
							item.charts ? (
								<TypeSelect
									charts={item.charts}
									current_type={current_type}
									index={index}
									setCurrentType={setCurrentType}
								></TypeSelect>
							) : null
						}
					>
						<Dynamic
							type='chart'
							name={getChartType(item.type, item.charts, index)}
							props={{
								name: item.name,
								data: item.data,
								...getChartProps(item.charts, item.props, index)
							}}
						></Dynamic>
						{item.table && (
							<Dynamic
								type='chart'
								name='table'
								props={{
									name: item.name,
									data: item.data,
									forChart: true,
									...item.table_props
								}}
							></Dynamic>
						)}
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default window.$app.memo(Index)
