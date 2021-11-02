import * as echarts from 'echarts/core'
import { useEffect } from 'react'

import type { BarSeriesOption } from 'echarts/charts'
import type {
	AriaComponentOption,
	TooltipComponentOption,
	LegendComponentOption
} from 'echarts/components'

type Option = echarts.ComposeOption<
	BarSeriesOption | AriaComponentOption | TooltipComponentOption | LegendComponentOption
>

export interface IProps {
	type: 'pie' | 'bar'
	name: string
	height: number
	tooltip: TooltipComponentOption
	legend: LegendComponentOption
	data: Array<any>
	series: Array<any>
}

export default (ref: any, props: IProps) => {
	useEffect(() => {
		if (!ref.current) return
		if (!props.data) return

		const series: Array<BarSeriesOption> = []

		props.series.map((item) => {
			series.push({
				...item,
				data: props.data.reduce((total, it) => {
					total.push({ value: it[item.name], name: it.name })

					return total
				}, [])
			})
		})

		const chart = echarts.init(ref.current, 'dark')

		const option: Option = {
			backgroundColor: 'transparent',
			aria: {
				decal: { show: true }
			},
			tooltip: {
				...props.tooltip
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				top: 'middle',
				itemWidth: 15,
				itemHeight: 9,
				textStyle: {
					fontSize: 12
				},
				...props.legend
			},
			series
		}

		chart.setOption(option)
	}, [ref.current, props])
}
