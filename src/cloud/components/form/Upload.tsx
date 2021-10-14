import { Upload } from 'antd'

import { Item } from '@/components'

import type { UploadProps } from 'antd'

interface IProps extends UploadProps {}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<Upload {...props}></Upload>
		</Item>
	)
}

export default window.$app.memo(Index)
