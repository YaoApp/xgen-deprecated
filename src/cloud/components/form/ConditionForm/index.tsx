import clsx from 'clsx'

import { Item } from '@/components'

import Multiple from './components/Multiple'
import Number from './components/Number'
import Single from './components/Single'
import Text from './components/Text'
import Time from './components/Time'
import styles from './index.less'
import setting from './setting'

interface IProps {
	name: string
	setting: string
	label: string
	value: any
	onChange: any
}

const Component = (props: IProps) => {
	return (
		<div className={clsx([styles._local, 'w_100 border_box'])}>
			{setting.map((item, index) => {
				const props_input = { item }

				return (
					<div
						className='condition_item w_100 border_box flex flex_column'
						key={index}
					>
						<div className='title'>{item.title}</div>
						{item.type === '单选' && <Single {...props_input}></Single>}
						{item.type === '多选' && <Multiple {...props_input}></Multiple>}
						{item.type === '数字' && <Number {...props_input}></Number>}
						{item.type === '文本' && <Text {...props_input}></Text>}
						{item.type === '时间' && <Time {...props_input}></Time>}
					</div>
				)
			})}
		</div>
	)
}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<Component {...props}></Component>
		</Item>
	)
}

export default window.$app.memo(Index)
