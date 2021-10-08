import { Tooltip } from 'antd'
import clsx from 'clsx'
import { useCallback } from 'react'
import { connect, useParams } from 'umi'

import { Icon } from '@/components'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

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
	app: IModelApp
	dispatch: Dispatch
}

const Index = (props: IProps) => {
	const { children, className, title, options = [], app, dispatch } = props
	const { menu, current_nav, current_menu, visible_menu } = app

	const params = useParams<{ id: string }>()

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
						{visible_menu ? (
							<MenuFoldOutlined className='icon_fold' />
						) : (
							<MenuUnfoldOutlined className='icon_fold' />
						)}
					</a>
					{params.id ? (
						<span className='page_title'>
							{params.id === '0' ? '添加' : '编辑'}
							{title}
						</span>
					) : (
						<span className='page_title'>{menu[current_nav].name}</span>
					)}
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
	app
})

export default window.$app.memo(connect(getInitialProps)(Index))
