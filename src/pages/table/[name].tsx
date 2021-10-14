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
	const { name } = useParams<{ name: string }>()

	if (!page_data?.setting?.name) return null

	const namespace = history.location.pathname
	const { setting, table, pagination, batch, selected, visible_modal } = page_data

	const setData = (key: keyof IModelTable, v: any) => {
		dispatch({
			type: `${namespace}/updateState`,
			payload: { [key]: v } as IModelTable
		})
	}

	const setBatch = (v: IModelTable['batch']) => setData('batch', v)
	const setSelected = (v: IModelTable['selected']) => setData('selected', v)
	const setVisibleModal = (v: IModelTable['visible_modal']) => setData('visible_modal', v)

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
				type: `${namespace}/batchDel`,
				payload: {
					name,
					ids: selected
				}
			})
		},
		onBatchUpdate(data: any) {
			dispatch({
				type: `${namespace}/batchUpdate`,
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
