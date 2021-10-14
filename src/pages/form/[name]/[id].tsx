import { connect, history } from 'umi'

import { Page } from '@/components'

import Breadcrumb from './components/Breadcrumb'
import Form from './components/Form'

import type { ConnectRC, IModelForm } from 'umi'

interface IProps {
	page_data: IModelForm
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data } = props

	if (!page_data?.setting?.name) return null

	const { setting, data } = page_data

	return (
		<Page title={setting.name}>
			<Breadcrumb></Breadcrumb>
			<Form {...{ setting, data }}></Form>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
