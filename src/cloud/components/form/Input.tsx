import { Input } from 'antd'
import { getLocale } from 'umi'

import { Item } from '@/components'

import type { InputProps } from 'antd'

interface IProps extends InputProps {
	label?: string
}

const Index = (props: IProps) => {
	const is_cn = getLocale() === 'zh-CN'

	return (
		<Item {...(props as any)}>
			<Input
				{...props}
				placeholder={
					props.placeholder ||
					`${is_cn ? '请输入' : 'Please input '}${props.label}`
				}
			></Input>
		</Item>
	)
}

export default window.$app.memo(Index)
