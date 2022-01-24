import { Radio } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

const { Group } = Radio

type TGroup = typeof Group

type IProps = TGroup & {
	name: string
	value: any
	label?: string
	rules: Array<any>
	remote: {
		api: string
		query: {
			keyword: string
			select: Array<string>
		}
	}
	options: Array<any>
}

const Index = (props: IProps) => {
	const [data, setData] = useState<Array<any>>([])

	const getData = async () => {
		const data = await request(
			`${props.remote.api}?select=${props.remote.query.select.join(',')}`
		)

		setData(data)
	}

	useEffect(() => {
		if (props.remote) {
			getData()
		}

		if (props.options) {
			setData(props.options)
		}
	}, [props])

	const options = useMemo(() => {
		if (!data.length) return []

		return data.reduce((total, item) => {
			total.push({
				label: item.name || item.label,
				value: String(item.id || item.value)
			})

			return total
		}, [])
	}, [data])

	return (
		<Item {...props}>
			<Group {...props} options={options}></Group>
		</Item>
	)
}

export default window.$app.memo(Index)
