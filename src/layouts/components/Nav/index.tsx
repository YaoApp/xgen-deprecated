import Logo from './components/Logo'
import Items from './components/Items'
import Options from './components/Options'
import styles from './index.less'
import type { IPropsNav, IPropsOptions } from '../../type'

const Index = (props: IPropsNav) => {
	const { menu, current_nav, setCurrentNav } = props

	const props_items: IPropsNav = {
		menu,
		current_nav,
		setCurrentNav
	}

	const props_options: IPropsOptions = {
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
