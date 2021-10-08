import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'

import styles from './index.less'

interface IProps {
	data: Array<any>
	primary: string
	title: string
	color: string
	unit?: string
}

const Index = (props: IProps) => {
	const { data = [], primary, title, color, unit } = props

	return (
		<div className={styles._local}>
			<div className='data_wrap w_100 border_box flex flex_column'>
				<span className='title'>{title}</span>
				<span className='value'>
					{data[data.length - 1][primary]}
					{unit}
				</span>
			</div>
			<ResponsiveContainer width='100%' height={60}>
				<AreaChart data={data} margin={{ top: 6, left: 0, right: 0, bottom: 0 }}>
					<defs>
						<linearGradient
							id={`bg_chart_area_${title}`}
							x1='0'
							y1='0'
							x2='0'
							y2='1'
						>
							<stop offset='0%' stopColor={color} stopOpacity={0.6} />
							<stop offset='100%' stopColor={color} stopOpacity={0.3} />
						</linearGradient>
					</defs>
					<Area
						type='monotone'
						dataKey={primary}
						stroke={color}
						strokeWidth={2}
						fillOpacity={1}
						fill={`url(#bg_chart_area_${title})`}
					/>
					<Tooltip
						content={({ label, payload }) => (
							<div className='custom_tooltip flex flex_column'>
								<span className='label flex align_center'>
									{label}
								</span>
								<div className='value_wrap flex align_center'>
									<span
										className='dot'
										style={{
											backgroundColor:
												payload?.[0]?.color
										}}
									></span>
									<span className='desc'>{title}：</span>
									<span className='value'>
										{payload?.[0]?.value}
										{unit}
									</span>
								</div>
							</div>
						)}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	)
}

export default window.$app.memo(Index)
