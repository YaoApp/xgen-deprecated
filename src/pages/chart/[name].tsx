import { connect, history } from 'umi'

import { Page } from '@/components'

import Charts from './components/Charts'
import Filter from './components/Filter'

import type { ConnectRC, Dispatch, IModelChart } from 'umi'

interface IProps {
	page_data: IModelChart
	dispatch: Dispatch
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data, dispatch } = props

	if (!page_data?.setting?.label) return null

	const namespace = history.location.pathname
	const { setting, data } = page_data

	const setData = (key: keyof IModelChart, v: any) => {
		dispatch({
			type: `${namespace}/updateState`,
			payload: { [key]: v } as IModelChart
		})
	}

	const props_filter = {
		setting
	}

	const props_charts = {
		setting,
		data
	}

	return (
		<Page title={setting.label}>
			<Filter {...props_filter}></Filter>
			<Charts {...props_charts}></Charts>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
