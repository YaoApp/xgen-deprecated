import { Link } from 'umi'
import { Tooltip } from 'antd'
import clsx from 'clsx'
import { Icon } from '@/components'
import styles from './index.less'
import type { IPropsNav } from '@/layouts/type'

const Index = ({ menu, current_nav, setCurrentNav }: IPropsNav) => {
	return (
		<div className={styles._local}>
			{menu.map((item, index) => (
				<Tooltip title={item.name} placement='right' key={index}>
					<Link
						className={clsx([
							'nav_item w_100 flex justify_center align_center clickable',
							current_nav === index ? 'active' : ''
						])}
						to={item.path}
						onClick={() => setCurrentNav(index)}
					>
						<Icon name={item.icon} size={20}></Icon>
					</Link>
				</Tooltip>
			))}
		</div>
	)
}

export default window.$app.memo(Index)
