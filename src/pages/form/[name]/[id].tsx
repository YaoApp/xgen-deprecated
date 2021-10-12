import { connect, history } from 'umi'

import Dynamic from '@/cloud/core'

import type { ConnectRC, IModelForm } from 'umi'

interface IProps {
	page_data: IModelForm
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data = { setting: {}, data: {} } } = props
	const { setting, data } = page_data

	return <Dynamic category='renders' type='Form' props={{ setting, data }}></Dynamic>
}

const getInitialProps = (model: any) => {
	const namespace = history.location.pathname

	return {
		page_data: model[namespace]
	}
}

export default window.$app.memo(connect(getInitialProps)(Index))
