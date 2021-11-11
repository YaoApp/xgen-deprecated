import CountUp from 'react-countup'

import { Icon } from '@/components'

import styles from './index.less'

interface IProps {
	name: string
	data: number
	icon: string
	unit?: string
}

const Index = (props: IProps) => {
	return (
		<div className={styles._local}>
			<Icon className='num_icon' name={props.icon} size={48} />
			<div className='flex flex_column'>
				<span className='num_title line_clamp_1'>{props.name}</span>
				<div className='num_wrap flex align_end'>
					<CountUp
						className='num'
						start={0}
						end={props.data}
						duration={3}
						decimals={props?.unit === '元' ? 2 : 0}
						useEasing
						separator=','
					/>
					<span className='unit'>{props?.unit}</span>
				</div>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
