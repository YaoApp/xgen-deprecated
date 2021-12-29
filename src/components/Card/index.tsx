import clsx from 'clsx'

import styles from './index.less'

interface IProps {
	children: React.ReactNode
	className?: string
	title?: string
	options?: React.ReactNode
	scrollMask?: boolean
	width?: string | number
	height?: string | number
}

const Index = (props: IProps) => {
	const { children, className, title, options, scrollMask, width, height } = props

	return (
		<div className={clsx([styles._local, className])} style={{ width, height }}>
			{scrollMask && <div className='mask w_100 absolute left_0'></div>}
			{title && (
				<div className='card_title_wrap w_100 border_box flex justify_between align_center'>
					<span className='card_title'>{title}</span>
					<div className='options_wrap'>{options}</div>
				</div>
			)}
			<div className='card_content_wrap w_100' style={{ height: `calc(100% - 44px)` }}>
				{children}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
