import { useEffect } from 'react'
import { connect, history, useParams } from 'umi'
import Dynamic from '@/cloud/core'
import type { ConnectRC, IModelList } from 'umi'

const namespace = history.location.pathname

interface IProps {
	loading: boolean
	page_data: IModelList
}

const Index: ConnectRC<IProps> = (props) => {
	const { history, page_data, dispatch } = props
	const { setting, list, pagination } = page_data

	const params = useParams<{ name: string }>()

	useEffect(() => {
		dispatch({
			type: `${history.location.pathname}/getSetting`,
			payload: { name: params.name }
		})
	}, [params.name, history.location.pathname])

	useEffect(() => {
		dispatch({
			type: `${history.location.pathname}/search`,
			// @ts-ignore
			payload: { name: params.name, query: history.location.query }
		})
	}, [params.name, history.location])

	return (
		<Dynamic category='renders' type='List' props={{ setting, list, pagination }}></Dynamic>
	)
}

const getInitialProps = (model: any) => ({
	loading:
		model.loading.effects[`${namespace}/getSetting`] ||
		model.loading.effects[`${namespace}/search`],
	page_data: model[namespace]
})

export default window.$app.memo(connect(getInitialProps)(Index))
