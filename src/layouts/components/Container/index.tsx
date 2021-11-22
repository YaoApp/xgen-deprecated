import clsx from 'clsx'
import { history } from 'umi'

import styles from './index.less'

import type { IPropsContainer } from '../../type'

const Index = (props: IPropsContainer & { children: React.ReactNode }) => {
	const { children, visible_nav, visible_menu } = props

	return (
		<div
			className={clsx([
				styles._local,
				!visible_menu ? styles.no_menu : '',
				!visible_menu && !visible_nav ? styles.no_left_nav : '',
				history.location.pathname.indexOf('/iframe') !== -1 ? styles.iframe : ''
			])}
		>
			<div className='content_wrap w_100 border_box'>{children}</div>
		</div>
	)
}

export default window.$app.memo(Index)
