import { Button, Modal } from 'antd'
import { Fragment, useEffect, useState } from 'react'

import Table from '@/cloud/components/form/Table'
import { Icon } from '@/components'

import type { ModalProps } from 'antd'

interface IProps {
	text: string
	name: string
	query: any
	queryDataSource: any
	import: (items: Array<any>) => void
}

const Index = (props: IProps) => {
	const [visible_modal, setVisibleModal] = useState(false)
	const [selected, setSelected] = useState<Array<any>>([])

	const props_modal: ModalProps = {
		visible: visible_modal,
		centered: true,
		width: 1200,
		footer: false,
		closable: false,
		zIndex: 1000,
		bodyStyle: { padding: 0 },
		wrapClassName: 'custom_modal',
		onCancel: () => setVisibleModal(false)
	}

	const props_table = {
		name: props.name,
		query: props.query,
		queryDataSource: props.queryDataSource,
		selectable: true,
		setSelected
	}

	useEffect(() => {
		if (!visible_modal) return
		if (!props?.name) return
	}, [props, visible_modal])

	return (
		<Fragment>
			<span
				className='btn_save cursor_point clickable edit_text line_clamp_2 mr_12'
				onClick={() => setVisibleModal(true)}
			>
				{props.text}
			</span>
			{visible_modal && (
				<Modal {...props_modal}>
					<div className='header_wrap w_100 border_box flex justify_between align_center'>
						<span className='title'>{props.text}</span>
						<div className='action_items flex'>
							<Button
								className='btn btn_close mr_12'
								icon={
									<Icon name='icon-arrow-left' size={15}></Icon>
								}
								onClick={() => setVisibleModal(false)}
							>
								关闭
							</Button>
							<Button
								className='btn'
								type='primary'
								onClick={() => {
									props.import(selected)
									setVisibleModal(false)
								}}
							>
								导入
							</Button>
						</div>
					</div>
					<div className='custom_wrap w_100 border_box flex flex_column'>
						<Table {...props_table}></Table>
					</div>
				</Modal>
			)}
		</Fragment>
	)
}

export default window.$app.memo(Index)
