import { connect, history } from 'umi'

import Dynamic from '@/cloud/core'

import type { ConnectRC, IModelForm } from 'umi'

interface IProps {
	loading: boolean
	page_data: IModelForm
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data = { setting: {}, data: {} }, dispatch } = props
	const { setting, data } = page_data

	return <Dynamic category='renders' type='Form' props={{ setting, data }}></Dynamic>
}

const getInitialProps = (model: any) => {
	const namespace = history.location.pathname

	return {
		loading:
			model.loading.effects[`${namespace}/getSetting`] ||
			model.loading.effects[`${namespace}/find`],
		page_data: model[namespace]
	}
}

export default window.$app.memo(connect(getInitialProps)(Index))
