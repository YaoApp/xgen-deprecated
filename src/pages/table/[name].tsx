import { Tooltip } from 'antd'
import clsx from 'clsx'
import { connect, history, useParams } from 'umi'

import { Page } from '@/components'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'

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
		setting
	}

	const props_list = {
		setting,
		table,
		pagination,
		batch,
		setSelected,
		search() {
			dispatch({
				type: `${namespace}/search`,
				payload: {
					name,
					query: history.location.search
				}
			})
		}
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

	const Options = batch ? (
		<div className='options_group_wrap border_box flex'>
			<a
				className={clsx([
					'option_item btn_confirm flex justify_center align_center transition_normal mr_16',
					!selected.length ? 'disabled' : ''
				])}
				onClick={() => setVisibleModal(true)}
			>
				<CheckOutlined className='icon_check' />
				<span className='text ml_6'>选择并编辑</span>
			</a>
			<Tooltip title='取消' placement='bottom'>
				<a
					className='option_item btn_close flex justify_center align_center'
					onClick={() => {
						setBatch(false)
						setSelected([])
					}}
				>
					<CloseOutlined />
				</a>
			</Tooltip>
		</div>
	) : (
		setting.list?.option?.batch && (
			<Tooltip title='批量编辑' placement='bottom'>
				<a
					className='option_item cursor_point flex justify_center align_center transition_normal clickable'
					onClick={() => setBatch(true)}
				>
					<EditOutlined className='icon_option' style={{ fontSize: 15 }} />
				</a>
			</Tooltip>
		)
	)

	return (
		<Page title={setting.name} options={Options}>
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
