import clsx from 'clsx'
import styles from './index.less'
import type { IPropsContainer } from '../../type'

const Index = (props: IPropsContainer & { children: React.ReactNode }) => {
	const { children, visible_menu } = props

	return (
		<div className={clsx([styles._local, !visible_menu ? styles.no_menu : ''])}>
			<div className='content_wrap w_100 border_box'>{children}</div>
		</div>
	)
}

export default window.$app.memo(Index)
