import { MapChart } from 'echarts/charts'
import { GeoComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import china from 'R/data/map/china.json'
import { useEffect, useRef } from 'react'

import type { BarSeriesOption } from 'echarts/charts'
import type {
	TooltipComponentOption,
	VisualMapComponentOption,
	GeoComponentOption
} from 'echarts/components'

type Option = echarts.ComposeOption<
	BarSeriesOption | GeoComponentOption | VisualMapComponentOption | TooltipComponentOption
>

export interface IProps {
	name: string
	height: number
	tooltip: TooltipComponentOption
	data: Array<any>
	series: Array<any>
}

echarts.registerMap('china', china as any)
echarts.use([CanvasRenderer, MapChart, GeoComponent, VisualMapComponent, TooltipComponent])

const Index = (props: IProps) => {
	const ref = useRef<any>()

	useEffect(() => {
		if (!ref.current) return
		if (!props.data) return

		const series: Array<BarSeriesOption> = []

		props.series.map((item) => {
			series.push({
				...item,
				data: [
					{
						name: '北京',
						value: 974
					},
					{
						name: '天津',
						value: 532
					},
					{
						name: '上海',
						value: 834
					},
					{
						name: '重庆',
						value: 683
					},
					{
						name: '河北',
						value: 283
					},
					{
						name: '河南',
						value: 345
					},
					{
						name: '云南',
						value: 72
					},
					{
						name: '辽宁',
						value: 194
					},
					{
						name: '黑龙江',
						value: 342
					},
					{
						name: '湖南',
						value: 389
					},
					{
						name: '安徽',
						value: 267
					},
					{
						name: '山东',
						value: 675
					},
					{
						name: '新疆',
						value: 14
					},
					{
						name: '江苏',
						value: 974
					},
					{
						name: '浙江',
						value: 978
					},
					{
						name: '江西',
						value: 528
					},
					{
						name: '湖北',
						value: 144
					},
					{
						name: '广西',
						value: 448
					},
					{
						name: '甘肃',
						value: 197
					},
					{
						name: '山西',
						value: 203
					},
					{
						name: '内蒙古',
						value: 73
					},
					{
						name: '陕西',
						value: 563
					},
					{
						name: '吉林',
						value: 147
					},
					{
						name: '福建',
						value: 112
					},
					{
						name: '贵州',
						value: 373
					},
					{
						name: '广东',
						value: 2747
					},
					{
						name: '青海',
						value: 38
					},
					{
						name: '西藏',
						value: 12
					},
					{
						name: '四川',
						value: 215
					},
					{
						name: '宁夏',
						value: 172
					},
					{
						name: '海南',
						value: 77
					},
					{
						name: '台湾',
						value: 123
					},
					{
						name: '香港',
						value: 32
					},
					{
						name: '澳门',
						value: 43
					},
					{
						name: '南海诸岛',
						value: 53
					}
				],
				itemStyle: {
					color: 'red',
					areaColor: '#031525',
					borderColor: '#FFFFFF'
				},
				label: {
					show: true
				}
			})
		})

		const chart = echarts.init(ref.current, 'dark')

		const option: Option = {
			backgroundColor: 'transparent',
			tooltip: {
				...props.tooltip
			},
			geo: {
				map: 'china',
				show: true,
				roam: false,
				itemStyle: {
					color: 'black',
					borderColor: '#0a53e9',
					shadowColor: '#092f8f',
					shadowBlur: 20
				}
			},
			visualMap: {},
			series
		}

		chart.setOption(option)
	}, [ref.current, props])

	return <div className='w_100' ref={ref} style={{ height: '100%' }}></div>
}

export default window.$app.memo(Index)
