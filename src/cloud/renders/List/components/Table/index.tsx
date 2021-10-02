import { Table } from 'antd'
import { history } from 'umi'
import { useColumns } from './hooks'
import styles from './index.less'

const Index = ({ setting, list, pagination }: any) => {
	const columns = useColumns(setting)

	return (
		<div className={styles._local}>
			<Table
				dataSource={list}
				columns={columns}
				sticky={{ offsetHeader: 52 }}
				rowKey={(item) => item.id}
				pagination={pagination}
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
