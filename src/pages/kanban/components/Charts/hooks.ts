import { useMemo } from 'react'

export const useCharts = (setting: any, data: any) => {
	const charts = useMemo(() => {
		if (!setting.page) return []
		if (!data) return []

		const charts = setting.page.layout.charts

		return charts.reduce((total: Array<any>, item: any) => {
			total.push({
				...item,
				span: item.width,
				data: data[item.name]
			})

			return total
		}, [])
	}, [setting, data])

	return charts
}
