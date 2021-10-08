import { Avatar, Badge, Button, Popover, Tooltip } from 'antd'
import store from 'store'
import { history, NavLink } from 'umi'

import { Icon } from '@/components'

import styles from './index.less'

import type { IPropsOptions } from '@/layouts/type'

const Index = (props: IPropsOptions) => {
	const { user, setCurrentNav } = props

	const User = (
		<div className='user_wrap flex flex_column'>
			<div className='info_wrap w_100 border_box flex align_center'>
				<Avatar
					className='cursor_point'
					size={50}
					style={{ backgroundColor: '#039be5' }}
				>
					{user.name.substr(0, 1)}
				</Avatar>
				<div className='info flex flex_column'>
					<span className='user_name'>{user.name}</span>
					<span className='user_account'>{user.email || user.mobile}</span>
				</div>
			</div>
			<div className='btn_wrap w_100 border_box'>
				<Button
					className='btn_logout w_100 flex justify_center align_center'
					type='primary'
					onClick={() => {
						store.clearAll()

						sessionStorage.removeItem('token')

						history.push('/login')
					}}
				>
					<Icon name='icon-log-out' size={15} color='white'></Icon>
					<span className='text'>退出登录</span>
				</Button>
			</div>
		</div>
	)

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
			<div id='option_item' className='option_item flex justify_center align_center'>
				<Popover
					overlayClassName='popover_user_wrap'
					trigger='click'
					placement='rightTop'
					align={{ offset: [15, 10] }}
					content={User}
					getPopupContainer={() =>
						document.getElementById('option_item') as HTMLElement
					}
				>
					<Badge dot offset={[-7, 7]}>
						<Avatar
							className='cursor_point'
							size={50}
							style={{ backgroundColor: '#039be5' }}
						>
							{user.name.substr(0, 1)}
						</Avatar>
					</Badge>
				</Popover>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
