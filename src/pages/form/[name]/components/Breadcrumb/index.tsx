import { Affix, Breadcrumb } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'umi'

import styles from './index.less'

import type { IModelApp, Dispatch } from 'umi'

const { Item } = Breadcrumb

interface IProps {
	setting: any
	params: { name: string; id: string }
	dispatch: Dispatch
}

const Index = (props: IProps) => {
	const { setting, params, dispatch } = props
	const [stick, setStick] = useState<boolean | undefined>(false)

	return (
		<div className={styles._local}>
			<Affix offsetTop={0} onChange={(v) => setStick(v)}>
				<Breadcrumb className={clsx(['bread transition_normal', stick && 'stick'])}>
					<Item>
						<Link
							to={`/table/${params.name}`}
							onClick={() => {
								dispatch({
									type: 'app/updateState',
									payload: { visible_menu: true } as IModelApp
								})
							}}
						>
							{setting.name}
						</Link>
					</Item>
					<Item>
						{params.id === '0' ? '添加' : '编辑'}
						{setting.name}
					</Item>
				</Breadcrumb>
			</Affix>
		</div>
	)
}

export default window.$app.memo(Index)
