import styles from './index.less'

const Index = ({ data }: any) => {
	console.log(data)

	return (
		<div className={styles._local}>
			{/* <Table
				dataSource={[]}
				columns={columns}
				sticky={{ offsetHeader: 52 }}
				rowKey={(item) => item.id}
				pagination={{
					showSizeChanger: true
				}}
			/> */}
		</div>
	)
}

export default window.$app.memo(Index)
