import { connect } from 'umi'

import { Page } from '@/components'

import Charts from './components/Charts'

import type { ConnectRC, IModelChart } from 'umi'

interface IProps {
	page_data: IModelChart
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data } = props

	if (!page_data?.setting?.label) return null

	const { setting, data } = page_data

	const props_charts = {
		setting,
		data
	}

	return (
		<Page title={setting.label}>
			<Charts {...props_charts}></Charts>
		</Page>
	)
}

const getInitialProps = ({ kanban }: any) => ({
	page_data: kanban
})

export default window.$app.memo(connect(getInitialProps)(Index))
