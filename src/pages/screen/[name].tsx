import { useEventListener } from 'ahooks'
import { connect, history, useParams } from 'umi'

import { Page } from '@/components'
import useRequestInterval from '@/hooks/useRequestInterval'

import Charts from './components/Charts'
import Header from './components/Header'

import type { ConnectRC, IModelChart, Dispatch } from 'umi'

interface IProps {
	page_data: IModelChart
	dispatch: Dispatch
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data, dispatch } = props
	const { name } = useParams<{ name: string }>()

	useEventListener('fullscreenchange', () => {
		if (!document.fullscreenElement) history.goBack()
	})

	useRequestInterval({
		name,
		pathname: history.location.pathname,
		page_data,
		dispatch
	})

	if (!page_data?.setting?.label) return null

	const { setting, data } = page_data

	const props_header = {
		setting,
		data
	}

	const props_charts = {
		setting,
		data
	}

	return (
		<Page title={setting.label} style={{ height: '100vh' }}>
			<Header {...props_header}></Header>
			<Charts {...props_charts}></Charts>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
