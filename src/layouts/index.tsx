import { Fragment, useEffect } from 'react'
import { connect } from 'umi'
import store from 'store'
import { install } from '@/utils/pwa'
import Nav from './components/Nav'
import Menu from './components/Menu'
import Container from './components/Container'
import type { IModelApp, Loading } from 'umi'
import type { IProps, IPropsNav, IPropsMenu, IPropsContainer } from './type'

if (process.env.NODE_ENV === 'production') install()

const Index = (props: IProps) => {
	const { dispatch, children, loading, app_data } = props
	const { menu, current_nav, current_menu, visible_menu } = app_data

	useEffect(() => {
		dispatch({
			type: 'app/updateState',
			payload: {
				visible_menu: !!menu[current_nav]?.children
			} as IModelApp
		})
	}, [menu, current_nav])

	const props_nav: IPropsNav = {
		menu,
		current_nav,
		setCurrentNav(current: IModelApp['current_nav']) {
			dispatch({
				type: 'app/updateState',
				payload: {
					current_nav: current,
					current_menu: menu[current]?.children?.[0].id
				} as IModelApp
			})

			store.set('current_nav', current)
			store.set('current_menu', menu[current]?.children?.[0].id)
		}
	}

	const props_menu: IPropsMenu = {
		visible: visible_menu,
		blocks: !!menu[current_nav]?.blocks,
		title: menu[current_nav]?.name,
		items: menu[current_nav]?.children,
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
