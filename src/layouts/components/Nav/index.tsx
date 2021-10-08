import Items from './components/Items'
import Logo from './components/Logo'
import Options from './components/Options'
import styles from './index.less'

import type { IPropsNav, IPropsOptions } from '../../type'

const Index = (props: IPropsNav) => {
	const { user, menu, current_nav, setCurrentNav } = props

	const props_items: Omit<IPropsNav, 'user'> = {
		menu,
		current_nav,
		setCurrentNav
	}

	const props_options: IPropsOptions = {
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
