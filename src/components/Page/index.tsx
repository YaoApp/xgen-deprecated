import { useCallback } from 'react'
import { connect } from 'umi'
import { Tooltip } from 'antd'
import clsx from 'clsx'
import { Icon } from '@/components'
import styles from './index.less'
import type { IModelApp, Dispatch } from 'umi'

interface IProps {
	children: React.ReactNode
	className?: string
	title: string
	options?: Array<{
		title: string
		icon: string
		action: string
	}>
	visible_menu: IModelApp['visible_menu']
	dispatch: Dispatch
}

const Index = (props: IProps) => {
	const { children, className, title, options = [], visible_menu, dispatch } = props

	const toggleMenu = useCallback(() => {
		dispatch({
			type: 'app/updateState',
			payload: { visible_menu: !visible_menu } as IModelApp
		})
	}, [visible_menu])

	const onAction = useCallback((type) => {
		dispatch({ type })
	}, [])

	return (
		<div className={clsx([styles._local, className])}>
			<header className='header w_100 border_box flex justify_between align_center'>
				<div className='left_wrap flex align_center'>
					<a
						className='icon_wrap cursor_point flex justify_center align_center transition_normal clickable'
						onClick={toggleMenu}
					>
						<Icon
							className='icon_back'
							name={
								visible_menu
									? 'arrow-back-ios-outline'
									: 'icon-menu'
							}
							size={23}
						></Icon>
					</a>
					<span className='page_title'>{title}</span>
				</div>
				<div className='options_wrap flex align_center'>
					{options.map((item, index) => (
						<Tooltip title={item.title} placement='bottom' key={index}>
							<a
								className='option_item cursor_point flex justify_center align_center transition_normal clickable'
								onClick={() => onAction(item.action)}
							>
								<Icon
									className='icon_option'
									name={item.icon}
									size={18}
								></Icon>
							</a>
						</Tooltip>
					))}
				</div>
			</header>
			<div className='page_wrap'>{children}</div>
		</div>
	)
}

const getInitialProps = ({ app }: { app: IModelApp }) => ({
	visible_menu: app.visible_menu
})

export default window.$app.memo(connect(getInitialProps)(Index))
