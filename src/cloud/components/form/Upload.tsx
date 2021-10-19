import { Upload } from 'antd'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'

import { Item } from '@/components'
import { getFileSrc } from '@/utils/helpers/filters'
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons'

import type { UploadProps } from 'antd'

interface IProps extends UploadProps {
	value: Array<string>
	filetype: 'image' | 'file' | 'video'
}

const map_filetype = {
	image: {
		listType: 'picture-card',
		className: '',
		desc: '上传图片'
	},
	file: {
		listType: 'text',
		className: 'text',
		desc: '上传文件'
	},
	video: {
		listType: 'picture-card',
		className: 'video',
		desc: '上传视频'
	}
}

const handlefileList = (fileList: Array<any>) => {
	return fileList.reduce((total: Array<any>, item: any) => {
		total.push(item.response)

		return total
	}, [])
}

const CustomUpload = window.$app.memo((props: IProps) => {
	const { onChange: trigger } = props
	const [list, setList] = useState<Array<any>>([])

	useEffect(() => {
		if (!props.value) return

		const list = props.value.reduce((total: Array<any>, item: any) => {
			const real_item: any = {
				uid: item,
				name: item,
				response: item
			}

			if (/(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico)$/i.test(item)) {
				real_item['thumbUrl'] = getFileSrc(item)
			}

			total.push(real_item)

			return total
		}, [])

		setList(list)
	}, [props.value])

	const visible_btn = useMemo(() => {
		if (!props.maxCount) return true

		return list.length < props.maxCount
	}, [list, props.maxCount])

	const onChange = ({ file, fileList }: any) => {
		const { status } = file

		if (!trigger) return

		if (status === 'done' || status === 'removed') {
			trigger(handlefileList(fileList) as any)
		}

		setList(fileList)
	}

	const props_upload: UploadProps = {
		...props,
		name: 'file',
		listType: map_filetype[props.filetype].listType as any,
		className: clsx(['form_item_upload_wrap', map_filetype[props.filetype].className]),
		action: '/api/xiang/storage/upload',
		headers: { authorization: `Bearer ${sessionStorage.getItem('token')}` || '' },
		fileList: list,
		isImageUrl: () => props.filetype === 'image',
		onChange
	}

	if (props.filetype === 'video') {
		const itemRender: UploadProps['itemRender'] = (_, file, fileList, { remove }) => {
			return (
				<div className='upload_video_wrap flex relative'>
					<div
						className='icon_delete absolute justify_center align_center transition_normal'
						onClick={remove}
					>
						<DeleteOutlined className='icon'></DeleteOutlined>
					</div>
					<video
						className='video'
						src={getFileSrc(file.response)}
						controls
					></video>
				</div>
			)
		}

		props_upload['itemRender'] = itemRender
	}

	return (
		<Upload {...props_upload}>
			{visible_btn && (
				<div
					className={clsx([
						'btn_upload_wrap flex align_center cursor_point',
						props.filetype,
						list.length ? 'has_data' : ''
					])}
				>
					<CloudUploadOutlined style={{ fontSize: 24 }} />
					<span className='desc'>{map_filetype[props.filetype].desc}</span>
				</div>
			)}
		</Upload>
	)
})

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<CustomUpload {...props}></CustomUpload>
		</Item>
	)
}

export default window.$app.memo(Index)
