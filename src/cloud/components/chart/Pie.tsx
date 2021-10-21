import { PieChart } from 'echarts/charts'
import { AriaComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { useRef } from 'react'

import useChart from '@/hooks/usePieChart'

import type { IProps } from '@/hooks/usePieChart'

echarts.use([CanvasRenderer, PieChart, AriaComponent, TooltipComponent, LegendComponent])

const Index = (props: IProps) => {
	const ref = useRef<any>()

	useChart(ref, props)

	return <div className='w_100' ref={ref} style={{ height: props.height || 300 }}></div>
}

export default window.$app.memo(Index)
