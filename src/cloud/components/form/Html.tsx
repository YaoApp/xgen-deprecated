import { Input } from 'antd'

import { Item } from '@/components'

import { useMemo, useState } from 'react'
import { request } from 'umi'
import type { SelectProps } from 'antd'

interface HTMLProps extends SelectProps<any> {
	page?: string
}

const Index = (props: HTMLProps) => {
	const [data, setData] = useState<string>('')

	const getData = async () => {
		const _html = await request(`${props.page}`)
		setData(_html)
	}
	const content = useMemo(() => {
		if (data == '') {
			getData()
			return
		}
		var innerHTML: { __html: string } | undefined = { __html: data }
		return innerHTML
	}, [data])

	return (
		<Item>
			<div dangerouslySetInnerHTML={content}></div>
		</Item>
	)
}

export default window.$app.memo(Index)
