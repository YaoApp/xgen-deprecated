import config from 'R/config'
import { Fragment } from 'react'
import store from 'store'
import { connect, Helmet, history, useHistory } from 'umi'

import { install } from '@/utils/pwa'

import Container from './components/Container'
import Menu from './components/Menu'
import Nav from './components/Nav'

import type { IModelApp } from 'umi'
import type { IProps, IPropsNav, IPropsMenu, IPropsContainer } from './type'

if (process.env.NODE_ENV === 'production' && config.pwa) install()

const Index = (props: IProps) => {
	const { dispatch, children, app_data } = props
	const { app_info, user, menu, current_nav, current_menu, visible_menu } = app_data
	const {
		location: { pathname }
	} = useHistory()

	if (!menu || !menu.length) {
		history.push('/login')

		return null
	}

	const props_nav: IPropsNav = {
		user,
		menu,
		current_nav,
		setCurrentNav(current: IModelApp['current_nav']) {
			dispatch({
				type: 'app/updateState',
				payload: {
					current_nav: current,
					current_menu: menu[current]?.children?.[0]?.id
				} as IModelApp
			})

			store.set('current_nav', current)
			store.set('current_menu', menu[current]?.children?.[0]?.id)
		}
	}

	const props_menu: IPropsMenu = {
		visible: visible_menu,
		blocks: !!menu[current_nav]?.blocks,
		title: menu[current_nav]?.name,
		items: menu[current_nav]?.children || [],
		current_menu,
		setCurrentMenu(current: IModelApp['current_menu']) {
			dispatch({
				type: 'app/updateState',
				payload: { current_menu: current } as IModelApp
			})

			store.set('current_menu', current)
		},
		setVisibleMenu(v: IModelApp['visible_menu']) {
			dispatch({
				type: 'app/updateState',
				payload: {
					visible_menu: v
				} as IModelApp
			})
		}
	}

	const props_container: IPropsContainer = {
		visible_menu
	}

	return (
		<Fragment>
			<Helmet>
				<title>{app_info.name || ''}</title>
				<link rel='shortcut icon' type='image/x-icon' href={app_info.icons.favicon} />
			</Helmet>
			{pathname === '/login' ? (
				children
			) : (
				<Fragment>
					<Nav {...props_nav}></Nav>
					<Menu {...props_menu}></Menu>
					<Container {...props_container}>{children}</Container>
				</Fragment>
			)}
		</Fragment>
	)
}

const getInitialProps = ({ app }: { app: IModelApp }) => ({
	app_data: app
})

export default window.$app.memo(connect(getInitialProps)(Index))
