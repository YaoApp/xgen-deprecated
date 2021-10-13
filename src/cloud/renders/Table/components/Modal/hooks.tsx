import { useEffect, useState } from 'react'

export const useOptions = (setting: any) => {
	const [options, setOptions] = useState<Array<any>>([])

	if (!setting.list?.option?.batch) return { options, setOptions }

	const _columns = setting.columns
	const _batch = setting.list.option.batch

	useEffect(() => {
		const ops = _batch.columns.reduce((total: any, item: any) => {
			total.push({
				..._columns[item.name],
				label: item.name,
				span: item.width,
				checked: false
			})

			return total
		}, [])

		setOptions(ops)
	}, [_batch.columns])

	return { options, setOptions }
}
