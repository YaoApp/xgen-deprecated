import { Upload } from 'antd'
import { useMemo, useState } from 'react'

import { Item } from '@/components'
import { CloudUploadOutlined } from '@ant-design/icons'

import type { UploadProps } from 'antd'

interface IProps extends UploadProps {}

const Index = (props: IProps) => {
	const {} = props
	const [list, setList] = useState<Array<any>>([])

	console.log(props)

	const visible_btn = useMemo(() => {
		if (!props.maxCount) return true

		return list.length < props.maxCount
	}, [list, props.maxCount])

	const onChange = ({ fileList }: any) => {
		setList(fileList)
	}

	return (
		<Item {...(props as any)}>
			<Upload {...props} className='form_item_upload_wrap' onChange={onChange}>
				{visible_btn && <CloudUploadOutlined style={{ fontSize: 24 }} />}
			</Upload>
		</Item>
	)
}

export default window.$app.memo(Index)
