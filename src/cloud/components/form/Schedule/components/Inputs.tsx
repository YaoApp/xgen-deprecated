import { Fragment } from 'react'

import Dynamic from '@/cloud/core'

interface IProps {
	cell: any
	tag: string
}

const Index = (props: IProps) => {
	const { cell, tag } = props

	return (
		<Fragment>
			{cell.map((item: any, index: number) => {
				const key = item.props.value.replace(':', '')
				const other_props: any = {}

				if (item.type === 'select') {
					if (item.props.remote?.query) {
						other_props['remote'] = {
							...item.props.remote,
							query: {
								...item.props.remote.query,
								tag
							}
						}
					} else {
						other_props['remote'] = {
							...item.props.remote,
							query: { tag }
						}
					}
				}

				return (
					<div className='flex align_center mr_6' key={index}>
						<Dynamic
							type='form'
							name={item.type}
							props={{
								...item.props,
								...other_props,
								name: key,
								label: item.label,
								value: undefined,
								style: { width: item.width }
							}}
						></Dynamic>
						{item?.after && (
							<span className='after ml_6'>{item.after}</span>
						)}
					</div>
				)
			})}
		</Fragment>
	)
}

export default window.$app.memo(Index)
