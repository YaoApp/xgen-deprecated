import clsx from 'clsx'

import Items from './components/Items'
import Logo from './components/Logo'
import Options from './components/Options'
import styles from './index.less'

import type { IPropsNav, IPropsOptions } from '../../type'

const Index = (props: IPropsNav) => {
	const { app_info, user, menu, visible_nav, current_nav, setCurrentNav, getUserMenu } = props

	const props_items: Omit<IPropsNav, 'app_info' | 'user' | 'getUserMenu' | 'visible_nav'> = {
		menu,
		current_nav,
		setCurrentNav
	}

	const props_options: IPropsOptions = {
		app_info,
		user,
		setCurrentNav,
		getUserMenu
	}

	return (
		<div className={clsx([styles._local, !visible_nav ? styles.invisible : ''])}>
			<div className='flex flex_column'>
				<Logo></Logo>
				<Items {...props_items}></Items>
			</div>
			<Options {...props_options}></Options>
		</div>
	)
}

export default window.$app.memo(Index)
