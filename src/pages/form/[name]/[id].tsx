import { useEffect } from 'react'
import { connect, history, useParams } from 'umi'

import Dynamic from '@/cloud/core'

import type { ConnectRC, IModelForm } from 'umi'

interface IProps {
	loading: boolean
	page_data: IModelForm
}

const Index: ConnectRC<IProps> = (props) => {
	const { history, page_data = { setting: {}, data: {} }, dispatch } = props
	const { setting, data } = page_data

	const params = useParams<{ name: string; id: string }>()

	useEffect(() => {
		setTimeout(() => {
			dispatch({
				type: `${history.location.pathname}/getSetting`,
				payload: { name: params.name }
			})

			if (params.id === '0') return

			dispatch({
				type: `${history.location.pathname}/find`,
				payload: params
			})
		}, 0)
	}, [params, history.location.pathname])

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
