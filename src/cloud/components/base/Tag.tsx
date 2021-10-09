import { Tag } from 'antd'
import { find } from 'lodash-es'

import type { TagProps } from 'antd'

const Index = (props: TagProps & { value: string; options: Array<any> }) => {
	const item = find(props.options, (it: any) => it.value === props.value)
	console.log(item.color)

	return (
		<Tag {...props} color={item.color}>
			{item.label}
		</Tag>
	)
}

export default window.$app.memo(Index)
