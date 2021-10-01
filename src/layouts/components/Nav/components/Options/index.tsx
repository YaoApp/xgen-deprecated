import { NavLink } from 'umi'
import { Tooltip, Avatar, Badge } from 'antd'
import { Icon } from '@/components'
import styles from './index.less'
import type { IPropsOptions } from '@/layouts/type'

const Index = (props: IPropsOptions) => {
	const { setCurrentNav } = props

	return (
		<div className={styles._local}>
			<Tooltip title='账号管理' placement='right'>
				<NavLink
					className='nav_item w_100 flex justify_center align_center clickable'
					to='/user'
					onClick={() => setCurrentNav(-1)}
				>
					<Icon name='icon-user' size={20}></Icon>
				</NavLink>
			</Tooltip>
			<Tooltip title='系统设置' placement='right'>
				<NavLink
					className='nav_item w_100 flex justify_center align_center clickable'
					to='/setting'
					onClick={() => setCurrentNav(-1)}
				>
					<Icon name='icon-settings' size={20}></Icon>
				</NavLink>
			</Tooltip>
			<div className='option_item flex justify_center align_center'>
				<Badge dot offset={[-7, 7]}>
					<Avatar
						className='cursor_point'
						size={50}
						style={{ backgroundColor: '#039be5' }}
					>
						员
					</Avatar>
				</Badge>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
