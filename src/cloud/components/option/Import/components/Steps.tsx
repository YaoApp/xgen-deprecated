import { Steps } from 'antd'

const { Step } = Steps

import type { IPropsSteps } from '../types'

const Index = (props: IPropsSteps) => {
	const { step } = props

	return (
		<Steps size='small' current={step}>
			<Step title='上传文件' />
			<Step title='字段映射' />
			<Step title='数据预览' />
			<Step title='导入完成' />
		</Steps>
	)
}

export default window.$app.memo(Index)
