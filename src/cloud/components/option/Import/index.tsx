import { Button, Modal, Tooltip } from 'antd'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import { request } from 'umi'

import { Icon } from '@/components'
import { UploadOutlined } from '@ant-design/icons'

import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Steps from './components/Steps'
import styles from './index.less'

const { confirm } = Modal

import type { ModalProps } from 'antd'

import type { IProps } from './types'

const Index = (props: IProps) => {
	const { api } = props
	const [visible_modal, setVisibleModal] = useState(false)
	const [setting, setSetting] = useState<any>({})
	const [step, setStep] = useState(0)
	const [file_name, setFileName] = useState('')

	const getSetting = async () => {
		const setting = await request(api.setting)

		setSetting(setting)
	}

	useEffect(() => {
		getSetting()
	}, [api])

	const props_modal: ModalProps = {
		visible: visible_modal,
		centered: true,
		width: 900,
		footer: false,
		closable: false,
		zIndex: 1000,
		bodyStyle: { padding: 0 },
		wrapClassName: 'custom_modal',
		onCancel: () => setVisibleModal(false)
	}

	const next = () => (step < 4 ? setStep(step + 1) : null)

	return (
		<Fragment>
			<Tooltip title='导入' placement='bottom'>
				<a
					className='option_item cursor_point flex justify_center align_center transition_normal clickable'
					onClick={() => setVisibleModal(true)}
				>
					<UploadOutlined className='icon_option' style={{ fontSize: 17 }} />
				</a>
			</Tooltip>
			<Modal {...props_modal}>
				<div className='header_wrap w_100 border_box flex justify_between align_center'>
					<span className='title'>{setting.title ?? '导入'}</span>
					<div className='action_items flex'>
						<Button
							className='btn btn_close'
							icon={<Icon name='icon-arrow-left' size={15}></Icon>}
							onClick={() => {
								confirm({
									title: '确认取消导入?',
									onOk() {
										setVisibleModal(false)
									}
								})
							}}
						>
							取消
						</Button>
						{step > 0 && (
							<Button
								className='btn ml_16'
								onClick={() => setStep(step - 1)}
							>
								上一步
							</Button>
						)}
						<Button className='btn ml_16' type='primary' onClick={next}>
							{step > 3 ? '确认导入' : '下一步'}
						</Button>
					</div>
				</div>
				<div
					className={clsx([
						styles._local,
						'custom_wrap w_100 border_box flex flex_column'
					])}
				>
					<Steps {...{ step }}></Steps>
					{step === 0 && <Step1 {...{ file_name, setFileName, next }}></Step1>}
					{step === 1 && <Step2 {...{ api, file_name }}></Step2>}
				</div>
			</Modal>
		</Fragment>
	)
}

export default window.$app.memo(Index)
