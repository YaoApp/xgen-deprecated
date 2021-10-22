import { Table } from 'antd'
import clsx from 'clsx'

import styles from './index.less'

interface IProps {
	height: number
	columns: Array<any>
	data: Array<any>
	forChart?: boolean
}

const Index = (props: IProps) => {
	return (
		<div
			className={clsx([styles._local, props.forChart ? styles.forChart : ''])}
			style={{ height: props.height || 300, overflow: 'scroll' }}
		>
			<Table
				columns={props.columns}
				dataSource={props.data}
				rowKey={(item) => item.id}
				pagination={false}
			></Table>
		</div>
	)
}

export default window.$app.memo(Index)
