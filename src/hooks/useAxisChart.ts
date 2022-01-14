import * as echarts from 'echarts/core'
import { useEffect } from 'react'

import type { BarSeriesOption } from 'echarts/charts'
import type {
	GridComponentOption,
	AriaComponentOption,
	TooltipComponentOption,
	TitleComponentOption
} from 'echarts/components'

type Option = echarts.ComposeOption<
	| BarSeriesOption
	| GridComponentOption
	| AriaComponentOption
	| TooltipComponentOption
	| TitleComponentOption
>

export interface IProps {
	name: string
	height: number
	data: Array<any>
	x_key: string
	axisLabel: any
	vertical: boolean
	textWrap: boolean
	textLength: number
	series: Array<any>
	hide_label: boolean
}

export default (ref: any, props: IProps) => {
	useEffect(() => {
		if (!ref.current) return
		if (!props.data) return

		const x_data: Array<string> = []
		const y_data: Array<any> = []
		const series: Array<BarSeriesOption> = []

		props.data.map((item) => {
			x_data.push(item[props.x_key])
		})

		props.series.map((item, index) => {
			series.push({
				...item,
				yAxisIndex: index,
				data: props.data.reduce((total, it) => {
					total.push(it[item.name])

					return total
				}, [])
			})

			y_data.push({
				...item,
				name: '',
				type: 'value'
			})
		})

		const chart = echarts.init(ref.current, 'dark')

		const option: Option = {
			title: props.hide_label
				? {
						left: 'left',
						text: props.name,
						textStyle: {
							color: '#aaaab3',
							fontSize: 14,
							fontWeight: 500
						}
				  }
				: undefined,
			backgroundColor: 'transparent',
			aria: {
				decal: { show: true }
			},
			tooltip: {
				trigger: 'axis',
				textStyle: {
					color: '#a2a5b9',
					fontSize: 12
				},
				backgroundColor: '#232326',
				borderRadius: 6
			},
			grid: {
				top: '8%',
				bottom: '4%',
				left: '2%',
				right: '2%',
				containLabel: true,
				show: false
			},
			[!props.vertical ? 'xAxis' : 'yAxis']: {
				type: 'category',
				data: x_data,
				axisTick: { show: false },
				axisLine: { show: false },
				axisLabel: {
					...(props.axisLabel || {}),
					formatter(value: string) {
						if (!props.textWrap) return value

						const maxLength = props.textLength || 5
						const valLength = value.length
						const rowN = Math.ceil(valLength / maxLength)
						let ret = ''

						if (rowN > 1) {
							for (let i = 0; i < rowN; i++) {
								const start = i * maxLength
								const end = start + maxLength
								let temp = ''

								temp = value.substring(start, end) + '\n'
								ret += temp
							}

							return ret
						} else {
							return value
						}
					}
				}
			},
			[props.vertical ? 'xAxis' : 'yAxis']: y_data,
			series
		}

		chart.setOption(option)
	}, [ref.current, props])
}
