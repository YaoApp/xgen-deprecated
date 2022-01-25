import { TreeSelect } from 'antd'
import { useMemo, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import type { TreeSelectProps } from 'antd'

interface IProps extends TreeSelectProps<any> {
	label?: string
	options: Array<any>
	remote: {
		api: string
		query: {
			select: Array<string>
		}
	}
}

const Index = (props: IProps) => {
	const [data, setData] = useState<TreeSelectProps<any>['treeData']>([])

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

		return _props
	}, [props])

	return (
		<Item {...(props as any)}>
			<TreeSelect
				{...real_props}
				treeData={data}
				placeholder={props.placeholder || `请选择${props.label}`}
			></TreeSelect>
		</Item>
	)
}

export default window.$app.memo(Index)
