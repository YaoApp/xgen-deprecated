import { connect, history } from 'umi'

import { Charts, Page } from '@/components'

import Filter from './components/Filter'

import type { ConnectRC, IModelChart } from 'umi'

interface IProps {
	page_data: IModelChart
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data } = props

	if (!page_data?.setting?.label) return null

	const { setting, data } = page_data

	const props_filter = {
		setting
	}

	const props_charts = {
		setting,
		data
	}

	return (
		<Page title={setting.label} chart>
			<Filter {...props_filter}></Filter>
			<Charts {...props_charts}></Charts>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
