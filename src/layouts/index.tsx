import NProgress from 'nprogress'
import config from 'R/config'
import { Fragment, useEffect } from 'react'
import store from 'store'
import { connect, Helmet, history } from 'umi'

import { Loader } from '@/components'
import { login_url } from '@/entry'
import { install } from '@/utils/pwa'

import Container from './components/Container'
import Menu from './components/Menu'
import Nav from './components/Nav'

import type { Loading, IModelApp } from 'umi'
import type { IProps, IPropsNav, IPropsMenu, IPropsContainer } from './type'

if (process.env.NODE_ENV === 'production' && config.pwa) install()

let path: any

const Index = (props: IProps) => {
	const { dispatch, children, loading, app_data } = props
	const {
		app_info,
		user,
		menu,
		current_nav,
		current_menu,
		visible_nav,
		visible_menu
	} = app_data
	const global_loading = loading.global

	useEffect(() => {
		if (path === history.location.pathname) return

		NProgress.start()

		if (global_loading) return

		NProgress.done()

		path = history.location.pathname
	}, [path, history.location.pathname, global_loading])

	if (
		history.location.pathname === '/login/admin' ||
		history.location.pathname === '/login/user'
	) {
		return children
	}

	if (!menu || !menu.length) {
		history.push(login_url)

		return null
	}

	const props_nav: IPropsNav = {
		app_info,
		user,
		menu,
		visible_nav,
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
		},
		getUserMenu() {
			dispatch({
				type: 'app/getUserMenu'
			})
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
		}
	}

	const props_container: IPropsContainer = {
		visible_nav,
		visible_menu
	}

	return (
		<Fragment>
			<Helmet>
				<link
					rel='shortcut icon'
					type='image/x-icon'
					href={app_info.icons?.favicon}
				/>
			</Helmet>
			<Loader></Loader>
			<Nav {...props_nav}></Nav>
			<Menu {...props_menu}></Menu>
			<Container {...props_container}>{children}</Container>
		</Fragment>
	)
}

const getInitialProps = ({ loading, app }: { loading: Loading; app: IModelApp }) => ({
	loading,
	app_data: app
})

export default window.$app.memo(connect(getInitialProps)(Index))
