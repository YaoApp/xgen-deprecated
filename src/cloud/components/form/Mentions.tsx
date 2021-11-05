import { Mentions } from 'antd'
import { find, throttle } from 'lodash-es'
import { useMemo, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import type { MentionProps } from 'antd'

const { Option } = Mentions

interface IProps extends MentionProps {
	name: string
	bind?: string
	label?: string
	rules: Array<any>
	remote: {
		api: string
		query: {
			keyword: string
			select: Array<string>
		}
	}
	search: {
		api: string
		key: string
	}
	options: Array<any>
}

const CustomMentions = (props: IProps) => {
	const [value, setValue] = useState<string>()
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<Array<any>>([])

	const getData = async () => {
		const data = await request(
			`${props.remote.api}?select=${props.remote.query.select.join(',')}`
		)

		setData(data)
	}

	const real_props = useMemo(() => {
		const _props = { ...props }

		if (_props.remote) {
			getData()
		}

		if (_props.options) {
			setData(_props.options)
		}

		if (props.search) {
			_props.onSearch = throttle(
				async (v: string) => {
					if (!v) return setData([])

					setLoading(true)

					const data = await request(
						`${props.search.api}?${props.search.key}=${v}`
					)

					setData(data)
					setLoading(false)
				},
				800,
				{ leading: false }
			)
		}

		return _props
	}, [props])

	const onChange = (v: string) => {
		if (!props.onChange) return

		const arr = v.split('@')

		const select = arr.reduce((total: Array<string>, item) => {
			if (!item) return total

			const text = item.split(' ')[0]
			const target: any = find(data, (it: any) => (it?.name || it?.label) === text)

			total.push(target?.id || target?.value)

			return total
		}, [])

		props.onChange({
			select,
			text: v
		} as any)

		setValue(v)
	}

	return (
		<Mentions
			{...real_props}
			placeholder={props.placeholder || `输入@选择${props.label}`}
			value={value}
			loading={loading}
			onChange={onChange}
		>
			{(data || []).map(
				(item: { id: number; name: string; label?: string; value?: any }) => (
					<Option
						key={item.id || item.value}
						value={String(item.name || item.label)}
					>
						{item.name || item.label}
					</Option>
				)
			)}
		</Mentions>
	)
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<CustomMentions {...props}></CustomMentions>
		</Item>
	)
}

export default window.$app.memo(Index)
