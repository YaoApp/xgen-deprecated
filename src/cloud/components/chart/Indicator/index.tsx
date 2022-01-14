import clsx from 'clsx'

import { Icon } from '@/components'

import styles from './index.less'

interface IProps {
	name: string
	table: string
	data: number
}

const max = 3900
const ok = 2100
const desc = ['不足', '达标']

const data = 1300

const Index = (props: IProps) => {
	return (
		<div className={clsx([styles._local, 'w_100 border_box flex flex_column'])}>
			<div className='flex justify_between align_center'>
				<span className='title'>{props.name}</span>
				<Icon name='icon-clock' size={18}></Icon>
			</div>
			<div className='w_100 border_box flex flex_column'>
				<div className='desc_items w_100 border_box flex justify_between'>
					{desc.map((item, index) => (
						<span className='desc_item' key={index}>
							{item}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
