import clsx from 'clsx'

import styles from './index.less'

interface IProps {
	children: React.ReactNode
	className?: string
	title?: string
	options?: React.ReactNode
}

const Index = (props: IProps) => {
	const { children, className, title, options } = props

	return (
		<div className={clsx([styles._local, className])}>
			{title && (
				<div className='card_title_wrap w_100 border_box flex justify_between align_center'>
					<span className='card_title'>{title}</span>
					<div className='options_wrap'>{options}</div>
				</div>
			)}
			<div className='card_content_wrap w_100'>{children}</div>
		</div>
	)
}

export default window.$app.memo(Index)
