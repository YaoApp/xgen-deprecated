import { useState } from 'react'
import { Link, getDvaApp } from 'umi'
import { Affix, Breadcrumb } from 'antd'
import clsx from 'clsx'
import styles from './index.less'
import type { IModelApp } from 'umi'

const { Item } = Breadcrumb

const Index = () => {
	const [stick, setStick] = useState<boolean | undefined>(false)

	return (
		<div className={styles._local}>
			<Affix offsetTop={0} onChange={(v) => setStick(v)}>
				<Breadcrumb className={clsx(['bread transition_normal', stick && 'stick'])}>
					<Item>
						<Link
							to='/bug/list'
							onClick={() => {
								getDvaApp()._store.dispatch({
									type: 'app/updateState',
									payload: { visible_menu: true } as IModelApp
								})
							}}
						>
							错误报告
						</Link>
					</Item>
					<Item>创建报告</Item>
				</Breadcrumb>
			</Affix>
		</div>
	)
}

export default window.$app.memo(Index)
