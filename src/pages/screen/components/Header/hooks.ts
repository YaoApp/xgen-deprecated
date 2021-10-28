import { useMemo } from 'react'

export const useHeader = (setting: any, data: any) => {
	const header = useMemo(() => {
		if (!data) return { left_index: [], right_index: [] }
		if (!setting?.page?.option?.left_index) return { left_index: [], right_index: [] }

		const _left_index = setting.page.option?.left_index
		const _right_index = setting.page.option?.right_index
		const left_index: Array<any> = []
		const right_index: Array<any> = []

		_left_index.map((item: string) => {
			left_index.push({
				name: item,
				value: data[item]
			})
		})

		_right_index.map((item: string) => {
			right_index.push({
				name: item,
				value: data[item]
			})
		})

		return { left_index, right_index }
	}, [setting, data])

	return header
}
