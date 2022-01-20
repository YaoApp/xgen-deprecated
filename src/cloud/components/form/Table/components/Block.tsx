import Dynamic from '@/cloud/core'

interface IProps {
	_columns: Array<any>
	item: any
	dataItem: any
	index: number
	getRender: any
}

const Index = (props: IProps) => {
	const { _columns, item, dataItem, index, getRender } = props

	const elements: any = {}

	for (const key in item.view.components) {
		const config = _columns[item.view.components[key]]
		const value = dataItem[config.view.props.value.replace(':', '')]

		elements[key] = getRender(config, dataItem, value, index)
	}

	return <Dynamic type='group' name={item.view.type} props={elements}></Dynamic>
}

export default window.$app.memo(Index)
