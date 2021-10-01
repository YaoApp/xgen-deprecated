import { Form, Input, Button } from 'antd'
import { Icon } from '@/components'
import styles from './index.less'

const { Item } = Form

const Index = () => {
	return (
		<div className={styles._local}>
			<div className='bg_wrap flex justify_center align_center'>
				<img className='bg' src={require('@/images/bg_login.svg')} alt='bg_login' />
			</div>
			<div className='login_wrap'>
				<div className='login h_100 flex flex_column justify_center'>
					<div className='logo_wrap w_100 flex justify_center'>
						<img className='logo' src='/logo.png' alt='logo' />
					</div>
					<div className='title_wrap w_100 border_box flex flex_column'>
						<span className='title'>登录系统</span>
						<span className='desc'>
							请使用管理员手机号和登录密码登录系统
						</span>
					</div>
					<Form className='form_wrap flex flex_column'>
						<div className='input_wrap'>
							<Item noStyle>
								<Input
									className='input input_mobile'
									type='text'
									prefix={
										<Icon
											name='icon-smartphone'
											size={24}
										></Icon>
									}
								></Input>
							</Item>
						</div>
						<div className='input_wrap'>
							<Item noStyle>
								<Input
									className='input input_password'
									type='password'
									prefix={
										<Icon name='icon-lock' size={24}></Icon>
									}
								></Input>
							</Item>
						</div>
						<Item noStyle>
							<Button
								className='btn_login'
								type='primary'
                                                htmlType='submit'
                                                shape='round'
							>
								立即登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
