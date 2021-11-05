import { Tooltip } from 'antd'

import styles from './index.less'

interface IProps
	extends React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> {
	value: string | number
}

const Index = (props: IProps) => {
	return (
		<Tooltip title={`访问 ${props.href}`}>
			<a className={styles._local} {...props}>
				{props.value || '-'}
			</a>
		</Tooltip>
	)
}

export default window.$app.memo(Index)
