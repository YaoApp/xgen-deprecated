import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { data_pie } from '@/_data_/kanban'
import { Card } from '@/components'
import { getColor } from '@/utils/helpers/colors'

import styles from './index.less'

const Index = () => {
	return (
		<Card className={styles._local} title='服务提供商行业分布'>
			<ResponsiveContainer width='100%' height={240}>
				<PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
					{data_pie.map((_, index) => (
						<defs key={index}>
							<linearGradient
								id={`bg_pie_chart_${index}`}
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='0%'
									stopColor={getColor(index)}
									stopOpacity={1}
								/>
								<stop
									offset='100%'
									stopColor={getColor(index)}
									stopOpacity={0.8}
								/>
							</linearGradient>
						</defs>
					))}
					<Pie
						data={data_pie}
						nameKey='name'
						dataKey='value'
						outerRadius='100%'
						fill='#8884d8'
						legendType='circle'
						labelLine={false}
						radius={4}
						label={({
							cx,
							cy,
							midAngle,
							innerRadius,
							outerRadius,
							percent
						}) => {
							const RADIAN = Math.PI / 180
							const radius =
								innerRadius + (outerRadius - innerRadius) * 0.64
							const x = cx + radius * Math.cos(-midAngle * RADIAN)
							const y = cy + radius * Math.sin(-midAngle * RADIAN)

							return (
								<text
									x={x}
									y={y}
									fill='white'
									dominantBaseline='central'
								>{`${(percent * 100).toFixed(0)}%`}</text>
							)
						}}
					>
						{data_pie.map((_, index) => (
							<Cell
								key={index}
								fill={`url(#bg_pie_chart_${index})`}
								stroke={getColor(index)}
							/>
						))}
					</Pie>
					<Tooltip
						content={({ payload }) => {
							return (
								<div className='custom_tooltip flex flex_column'>
									<span className='label flex align_center'>
										{payload?.[0]?.name}
									</span>
									<div className='value_wrap flex align_center'>
										<span
											className='dot'
											style={{
												backgroundColor:
													payload?.[0]?.payload
														?.stroke
											}}
										></span>
										<span className='value'>
											{payload?.[0]?.value}
										</span>
									</div>
								</div>
							)
						}}
					/>
					<Legend
						layout='vertical'
						align='right'
						verticalAlign='top'
						content={({ payload }) => {
							return (
								<div className='custom_legend flex flex_column'>
									{payload?.map((item, index) => (
										<div
											className='flex align_center'
											key={index}
										>
											<span
												className='dot'
												style={{
													backgroundColor:
														getColor(index)
												}}
											></span>
											<span
												className='value'
												key={index}
											>
												{item.value}
											</span>
										</div>
									))}
								</div>
							)
						}}
					></Legend>
				</PieChart>
			</ResponsiveContainer>
		</Card>
	)
}

export default window.$app.memo(Index)
