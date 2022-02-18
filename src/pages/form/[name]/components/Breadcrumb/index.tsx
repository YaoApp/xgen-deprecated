import { Affix, Breadcrumb } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { history, Link, useIntl } from 'umi'

import styles from './index.less'

import type { Dispatch } from 'umi'

const { Item } = Breadcrumb

interface IProps {
	setting: any
	params: { name: string; id: string }
	dispatch: Dispatch
}

const Index = (props: IProps) => {
	const { setting, params } = props
	const [stick, setStick] = useState<boolean | undefined>(false)
	const { query } = history.location
	const { messages } = useIntl()

	return (
		<div className={styles._local}>
			<Affix offsetTop={0} onChange={(v) => setStick(v)}>
				<Breadcrumb className={clsx(['bread transition_normal', stick && 'stick'])}>
					<Item>
						<Link to={`/table/${params.name}`}>{setting.name}</Link>
					</Item>
					<Item>
						{params.id === '0'
							? (messages as any).form.title.add
							: query?.type === 'view'
							? (messages as any).form.title.view
							: (messages as any).form.title.edit}
						{setting.name}
					</Item>
				</Breadcrumb>
			</Affix>
		</div>
	)
}

export default window.$app.memo(Index)
