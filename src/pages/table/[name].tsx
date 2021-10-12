import { connect, history } from 'umi'

import Dynamic from '@/cloud/core'

import type { ConnectRC, IModelTable } from 'umi'

interface IProps {
	page_data: IModelTable
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data = { setting: {}, table: [], pagination: {} } } = props
	const { setting, table, pagination } = page_data

	return (
		<Dynamic
			category='renders'
			type='Table'
			props={{ setting, table, pagination }}
		></Dynamic>
	)
}

const getInitialProps = (model: any) => {
	const namespace = history.location.pathname

	return {
		page_data: model[namespace]
	}
}

export default window.$app.memo(connect(getInitialProps)(Index))
