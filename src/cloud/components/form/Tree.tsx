import { Tree } from 'antd'
import { useMemo, useState } from 'react'
import { request } from 'umi'

import { Item } from '@/components'

import type { TreeProps } from 'antd'

interface IProps extends TreeProps {
	options: Array<any>
	remote: {
		api: string
		query: {
			keyword: string
			select: Array<string>
		}
	}
}

type Keys = Array<React.Key> | { checked: Array<React.Key>; halfChecked: Array<React.Key> }

const CustomTree = (props: IProps) => {
	const [keys, setKeys] = useState<Keys>()
	const [data, setData] = useState<TreeProps['treeData']>([])

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

	const onCheck = (v: Keys) => {
		// @ts-ignore
		props.onChange(v)

		setKeys(v)
	}

	return <Tree {...real_props} treeData={data} checkedKeys={keys} onCheck={onCheck}></Tree>
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<CustomTree {...props}></CustomTree>
		</Item>
	)
}

export default window.$app.memo(Index)
