import { Anchor } from 'antd'

import styles from './index.less'

interface IProps {
	setting: any
}

const { Link } = Anchor

const Index = (props: IProps) => {
	const { setting } = props
	const { fieldset } = setting.edit.layout

	return (
		<div className={styles._local}>
			<Anchor offsetTop={60} onClick={(e) => e.preventDefault()}>
				{fieldset.map((item: any, index: number) => (
					<Link title={item.title} href={`#${item.title}`} key={index}>
						{item.columns.map((it: any, idx: number) => (
							<Link
								title={it.name}
								href={`#${it.name}`}
								key={idx}
							></Link>
						))}
					</Link>
				))}
			</Anchor>
		</div>
	)
}

export default window.$app.memo(Index)
