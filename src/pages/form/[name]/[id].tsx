import { connect, history } from 'umi'

import Dynamic from '@/cloud/core'

import type { ConnectRC, IModelForm } from 'umi'

interface IProps {
	page_data: IModelForm
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data } = props

	return <Dynamic category='renders' type='Form' props={page_data}></Dynamic>
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
