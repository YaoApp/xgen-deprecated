import { history } from 'umi'

import Table from '@/cloud/components/form/Table'

import styles from './index.less'

const Index = ({ setting, table, pagination, batch, setSelected }: any) => {
	const onChangeSelected = (v: any) => {
		setSelected(v)
	}

	const total = setting.list?.actions?.pagination?.props?.showTotal
		? { showTotal: (total: number) => `共查询到${total}条记录` }
		: {}

	return (
		<div className={styles._local}>
			<Table
				data={table}
				setting={setting}
				pagination={
					setting.list?.actions?.pagination
						? {
								...pagination,
								...total
						  }
						: false
				}
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
