export interface IPropsConditionItem {
	item: {
		title: string
		type: string
		children: Array<any>
		value: any
	}
	index: number
	value: any
	onChange: (index: number, v: any) => void
}
