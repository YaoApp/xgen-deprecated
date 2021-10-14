import { useState } from 'react'
import { connect, history, useParams } from 'umi'

import { Page } from '@/components'

import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'

import type { ConnectRC, Dispatch, IModelTable } from 'umi'

interface IProps {
	page_data: IModelTable
	dispatch: Dispatch
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data, dispatch } = props

	if (!page_data?.setting?.name) return null

	const { setting, table, pagination } = page_data

	const [batch, setBatch] = useState(false)
	const [selected, setSelected] = useState([])
	const [visible_modal, setVisibleModal] = useState(false)
	const { name } = useParams<{ name: string }>()

	const props_filter = {
		setting,
		batch,
		selected,
		setBatch,
		setVisibleModal
	}

	const props_list = {
		setting,
		table,
		pagination,
		batch,
		setSelected
	}

	const props_modal = {
		setting,
		visible: visible_modal,
		setVisibleModal,
		onBatchDelete() {
			dispatch({
				type: `${history.location.pathname}/batchDel`,
				payload: {
					name,
					ids: selected
				}
			})
		},
		onBatchUpdate(data: any) {
			dispatch({
				type: `${history.location.pathname}/batchUpdate`,
				payload: {
					name,
					ids: selected,
					data
				}
			})
		}
	}

	return (
		<Page title={setting.name}>
			<Filter {...props_filter}></Filter>
			<List {...props_list}></List>
			<Modal {...props_modal}></Modal>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
