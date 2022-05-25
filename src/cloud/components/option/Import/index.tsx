import { Button, message, Modal, Tabs, Tooltip } from 'antd'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import { getDvaApp, history, request, useParams } from 'umi'

import { Icon } from '@/components'
import { UploadOutlined } from '@ant-design/icons'

import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'
import Steps from './components/Steps'
import styles from './index.less'

const { confirm } = Modal
const { TabPane } = Tabs

import type { ModalProps } from 'antd'

import type { IProps } from './types'

const Index = (props: IProps) => {
	const { api, operation } = props
	const [visible_modal, setVisibleModal] = useState(false)
	const [setting, setSetting] = useState<any>({})
	const [step, setStep] = useState(0)
	const [file_name, setFileName] = useState('')
	const [preview_payload, setPreviewPayload] = useState<any>({})
	const { name } = useParams<{ name: string }>()

	const getSetting = async () => {
		const setting = await request(api.setting)

		setSetting(setting)
	}

	useEffect(() => {
		getSetting()
	}, [api])

	useEffect(() => {
		if (visible_modal) return

		setStep(0)
		setFileName('')
		setPreviewPayload({})
	}, [visible_modal])

	const props_modal: ModalProps = {
		visible: visible_modal,
		centered: true,
		width: 900,
		footer: false,
		closable: false,
		zIndex: 1000,
		destroyOnClose: true,
		bodyStyle: { padding: 0 },
		wrapClassName: 'custom_modal',
		onCancel: () => setVisibleModal(false)
	}

	const next = () => {
		if (step < 3) {
			setStep(step + 1)
		}

		if (step === 3) {
			getDvaApp()._store.dispatch({
				type: `${history.location.pathname}/search`,
				payload: { name }
			})

			setVisibleModal(false)
		}
	}

	const onItem = (it: any) => {
		if (it?.link) {
			window.open(it.link)

			return
		}

		const postAction = async () => {
			const res = await request(it.api, {
				method: 'POST'
			})

			if (!res) return

			message.success('操作成功！')
		}

		if (it?.confirm) {
			confirm({
				title: '操作提示',
				content: `确认${it.title}？`,
				onOk() {
					postAction()
				}
			})
		} else {
			postAction()
		}
	}

	return (
		<Fragment>
			<Tooltip title={setting.title ?? '导入'} placement='bottom'>
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
						{operation && (
							<div className='operation_wrap flex align_center'>
								{operation.map((item: any, index: number) => (
									<Button
										className='btn_action mr_12'
										key={index}
										onClick={() => onItem(item)}
									>
										{item.title}
									</Button>
								))}
							</div>
						)}
						{step < 3 && (
							<Button
								className='btn btn_close'
								icon={
									<Icon name='icon-arrow-left' size={15}></Icon>
								}
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
						)}
						{step > 0 && step < 3 && (
							<Button
								className='btn ml_16'
								onClick={() => setStep(step - 1)}
							>
								上一步
							</Button>
						)}
						<Button
							className='btn ml_16'
							type='primary'
							disabled={step === 0}
							onClick={next}
						>
							{step === 3 ? '完成' : '下一步'}
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
					<Tabs activeKey={`${step}`} renderTabBar={undefined} animated>
						<TabPane key={0}>
							<Step1 {...{ file_name, setFileName, next }}></Step1>
						</TabPane>
						<TabPane key={1}>
							<Step2 {...{ api, file_name, setPreviewPayload }}></Step2>
						</TabPane>
						<TabPane key={2}>
							<Step3 {...{ api, preview_payload }}></Step3>
						</TabPane>
						<TabPane key={3}>
							<Step4 {...{ api, preview_payload }}></Step4>
						</TabPane>
					</Tabs>
				</div>
			</Modal>
		</Fragment>
	)
}

export default window.$app.memo(Index)
