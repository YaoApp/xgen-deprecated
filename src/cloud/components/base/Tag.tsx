import { Tag } from 'antd'
import { find } from 'lodash-es'

import type { TagProps } from 'antd'

interface IProps extends TagProps {
	value: string | Array<{ label: string; color?: string }>
	options: Array<any>
}

const Index = (props: IProps) => {
	if (typeof props.value === 'string') {
		const item = find(props.options, (it: any) => it.value === props.value)

		return (
			<Tag {...props} color={item.color}>
				{item.label}
			</Tag>
		)
	} else if (Array.isArray(props.value) && props.value.length) {
		return (
			<div className='flex'>
				{props.value.map((item, index) => (
					<Tag
						{...props}
						color={item.color || '#232326'}
						style={{ margin: 3 }}
						key={index}
					>
						{item.label || item}
					</Tag>
				))}
			</div>
		)
	} else {
		return <div className='edit_text line_clamp_2'>-</div>
	}
}

export default window.$app.memo(Index)
