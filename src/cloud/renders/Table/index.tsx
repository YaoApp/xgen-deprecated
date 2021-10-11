import { useState } from 'react'
import { getDvaApp, useHistory, useParams } from 'umi'

import { Page } from '@/components'

import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'

import type { Dispatch } from 'umi'

const Index = ({ setting = {}, table, pagination }: any) => {
	const [batch, setBatch] = useState(false)
	const [selected, setSelected] = useState([])
	const [visible_modal, setVisibleModal] = useState(false)
	const { location } = useHistory()
	const { name } = useParams<{ name: string }>()
	const dispatch: Dispatch = getDvaApp()._store.dispatch

	if (!setting.name) return null

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
				type: `${location.pathname}/batchDel`,
				payload: {
					name,
					ids: selected
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

export default window.$app.memo(Index)
