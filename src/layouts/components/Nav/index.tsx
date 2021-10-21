import Items from './components/Items'
import Logo from './components/Logo'
import Options from './components/Options'
import styles from './index.less'

import type { IPropsNav, IPropsOptions } from '../../type'

const Index = (props: IPropsNav) => {
	const { app_info, user, menu, current_nav, setVisibleMenu, setCurrentNav } = props

	const props_items: Omit<IPropsNav, 'app_info' | 'user'> = {
		menu,
		current_nav,
		setVisibleMenu,
		setCurrentNav
	}

	const props_options: IPropsOptions = {
		app_info,
		user,
		setCurrentNav
	}

	return (
		<div className={styles._local}>
			<div className='flex flex_column'>
				<Logo></Logo>
				<Items {...props_items}></Items>
			</div>
			<Options {...props_options}></Options>
		</div>
	)
}

export default window.$app.memo(Index)
