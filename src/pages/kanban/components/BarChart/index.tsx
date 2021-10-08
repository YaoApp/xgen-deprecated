import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { data_bar } from '@/_data_/kanban'
import { Card } from '@/components'

import styles from './index.less'

const Index = () => {
	return (
		<Card className={styles._local} title='全国可用性前10省份'>
			<ResponsiveContainer width='100%' height={240}>
				<BarChart
					data={data_bar}
					layout='vertical'
					barSize={9}
					margin={{
						top: 0,
						right: 20,
						left: -10,
						bottom: 0
					}}
				>
					<defs>
						<linearGradient id='bg_bar_chart' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#41b883' stopOpacity={1} />
							<stop
								offset='100%'
								stopColor='#41b883'
								stopOpacity={0.6}
							/>
						</linearGradient>
					</defs>
					<XAxis type='number' axisLine={false} tickMargin={5}></XAxis>
					<YAxis
						dataKey='name'
						type='category'
						axisLine={false}
						tickLine={false}
						tickMargin={10}
						interval={0}
					></YAxis>
					<Bar
						dataKey='value'
						fill='url(#bg_bar_chart)'
						background={{ fill: 'rgba(255, 255, 255, 0.05)', radius: 2 }}
						radius={2}
					/>
					<Tooltip
						cursor={{
							stroke: 'rgba(255, 255, 255, 0.1)',
							strokeWidth: 4,
							fillOpacity: 0
						}}
						cursorStyle={{ fill: 'white' }}
						content={({ label, payload }) => (
							<div className='custom_tooltip flex flex_column'>
								<span className='label flex align_center'>
									{label}
								</span>
								<div className='value_wrap flex align_center'>
									<span className='value'>
										{payload?.[0]?.value}
									</span>
								</div>
							</div>
						)}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Card>
	)
}

export default window.$app.memo(Index)
