import { Carousel, Col, Radio, Row } from 'antd'
import clsx from 'clsx'
import { cloneDeep } from 'lodash-es'
import { useCallback, useRef, useState } from 'react'

import Dynamic from '@/cloud/core'
import { Card } from '@/components'

import { useCharts } from './hooks'
import styles from './index.less'

const { Group } = Radio

const TypeSelect = ({ charts, swiper, current_type, index, setCurrent, goTo }: any) => {
	if (!charts) return null

	if (swiper) {
		return (
			<div className={clsx([styles.indicate_items, 'flex'])}>
				{charts.map((item: any, idx: number) => (
					<span
						className={clsx(
							'indicate_item cursor_point ml_10 clickable',
							(current_type[index] === undefined && idx === 0) ||
								current_type[index] === idx
								? 'active'
								: ''
						)}
						key={idx}
						onClick={() => {
							setCurrent(idx)
							goTo(idx)
						}}
					>
						{item.data_key}
					</span>
				))}
			</div>
		)
	}

	return (
		<Group defaultValue={0} onChange={({ target: { value } }) => setCurrent(value)}>
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
	const slider = useRef<any>()

	const [current_type, setCurrentType] = useState<{ [key: number]: number }>([])

	const setCurrent = useCallback(
		(index: number, v: number) => {
			const _current_type = cloneDeep(current_type)

			_current_type[index] = v

			setCurrentType(_current_type)
		},
		[current_type]
	)

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

	const goTo = useCallback(
		(v: number) => {
			if (!slider.current) return

			slider.current.goTo(v)
		},
		[slider]
	)

	return (
		<Row className={styles._local} gutter={20} wrap style={{ margin: 0 }}>
			{charts.map((item: any, index: number) => (
				<Col span={item.span} key={index}>
					<Card
						title={item.name}
						scrollMask={item.type === 'table' || item.table}
						options={
							<TypeSelect
								charts={item.charts}
								swiper={item.swiper}
								current_type={current_type}
								index={index}
								setCurrent={setCurrent}
								goTo={goTo}
							></TypeSelect>
						}
					>
						{item?.swiper ? (
							<Carousel
								ref={slider}
								autoplay
								pauseOnHover
								dots={false}
								autoplaySpeed={item?.speed || 3000}
								afterChange={(v) => setCurrent(index, v)}
							>
								{item.charts.map((it: any, idx: number) => (
									<Dynamic
										type='chart'
										name={it.type}
										props={{
											name: it.name,
											data: item.data,
											...it.props
										}}
										key={idx}
									></Dynamic>
								))}
							</Carousel>
						) : (
							<Dynamic
								type='chart'
								name={getChartType(item.type, item.charts, index)}
								props={{
									name: item.name,
									data: item.data,
									...getChartProps(
										item.charts,
										item.props,
										index
									)
								}}
							></Dynamic>
						)}
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
