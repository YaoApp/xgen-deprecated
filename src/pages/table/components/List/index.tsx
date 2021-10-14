import { Table } from 'antd'
import { history } from 'umi'

import { useColumns } from './hooks'
import styles from './index.less'

const Index = ({ setting, table, pagination, batch, setSelected }: any) => {
	const columns = useColumns(setting)

	const onChangeSelected = (v: any) => {
		setSelected(v)
	}

	return (
		<div className={styles._local}>
			<Table
				dataSource={table}
				columns={columns}
				sticky={{ offsetHeader: 52 }}
				rowKey={(item) => item.id}
				pagination={pagination}
				rowSelection={
					batch
						? {
								type: 'checkbox',
								onChange(v) {
									onChangeSelected(v)
								}
						  }
						: (null as any)
				}
				onChange={(page) => {
					// @ts-ignore
					history.push({
						pathname: history.location.pathname,
						query: {
							...history.location.query,
							page: page.current,
							pagesize: page.pageSize
						}
					})
				}}
			/>
		</div>
	)
}

export default window.$app.memo(Index)
