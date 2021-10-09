import { Button, Modal } from 'antd'

import type { ModalProps } from 'antd'

const { confirm } = Modal

interface IProps extends ModalProps {
	setting: any
	setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>
	onBatchDelete: () => void
}

const Index = (props: IProps) => {
	const { setting, setVisibleModal, onBatchDelete } = props

	console.log(setting)

	const Footer = (
		<div className='flex w_100 justify_between'>
			<div className='left_options'>
				<Button
					danger
					onClick={() =>
						confirm({
							title: '确认进行批量删除',
							content: '删除之后数据不可恢复，请谨慎操作！',
							centered: true,
							onOk() {
								onBatchDelete()
							}
						})
					}
				>
					批量删除
				</Button>
			</div>
			<div className='right_options'>
				<Button onClick={() => setVisibleModal(false)}>取消</Button>
				<Button type='primary'>确定</Button>
			</div>
		</div>
	)

	return (
		<Modal
			{...props}
			title='批量编辑'
			centered
			onCancel={() => setVisibleModal(false)}
			footer={Footer}
		>
			functions will be ...
		</Modal>
	)
}

export default window.$app.memo(Index)
