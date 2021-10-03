import { useState } from 'react'
import { connect, Link, useParams } from 'umi'
import { Affix, Breadcrumb } from 'antd'
import clsx from 'clsx'
import styles from './index.less'
import type { IModelApp, Dispatch } from 'umi'

const { Item } = Breadcrumb

const Index = (props: { app: IModelApp; dispatch: Dispatch }) => {
	const { app, dispatch } = props
	const { menu, current_nav } = app
	const params = useParams<{ id: string }>()
	const [stick, setStick] = useState<boolean | undefined>(false)

	return (
		<div className={styles._local}>
			<Affix offsetTop={0} onChange={(v) => setStick(v)}>
				<Breadcrumb className={clsx(['bread transition_normal', stick && 'stick'])}>
					<Item>
						<Link
							to={menu[current_nav].path}
							onClick={() => {
								dispatch({
									type: 'app/updateState',
									payload: {
										visible_menu: true
									} as IModelApp
								})
							}}
						>
							{menu[current_nav].name}
						</Link>
					</Item>
					<Item>
						{params.id === '0' ? '添加' : '编辑'}
						{menu[current_nav].name}
					</Item>
				</Breadcrumb>
			</Affix>
		</div>
	)
}

const getInitialProps = ({ app }: { app: IModelApp }) => ({
	app
})

export default window.$app.memo(connect(getInitialProps)(Index))
