import { Table } from 'antd'

import styles from './index.less'

interface IProps {
	height: number
	columns: Array<any>
	data: Array<any>
}

const Index = (props: IProps) => {
	return (
		<div
			className={styles._local}
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
