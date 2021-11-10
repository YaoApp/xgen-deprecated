import { Tooltip } from 'antd'

import styles from './index.less'

interface IProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	value: string | undefined
}

const Index = (props: IProps) => {
	return (
		<Tooltip title={`访问 ${props.href || props.value}`}>
			<a
				className={styles._local}
				{...props}
				target='_blank'
				href={props.href || props.value}
			>
				{props.value || '-'}
			</a>
		</Tooltip>
	)
}

export default window.$app.memo(Index)
