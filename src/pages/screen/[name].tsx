import { useEventListener } from 'ahooks'
import { connect, history } from 'umi'

import { Page } from '@/components'

import Charts from './components/Charts'

import type { ConnectRC, IModelChart } from 'umi'

interface IProps {
	page_data: IModelChart
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data } = props

	useEventListener('fullscreenchange', () => {
		if (!document.fullscreenElement) history.goBack()
	})

	if (!page_data?.setting?.label) return null

	const { setting, data } = page_data

	const props_charts = {
		setting,
		data
	}

	return (
		<Page title={setting.label} style={{ height: '100vh' }}>
			<Charts {...props_charts}></Charts>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
