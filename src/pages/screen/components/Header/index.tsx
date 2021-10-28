import { useUpdate } from 'ahooks'
import { useEffect } from 'react'

import { useHeader } from './hooks'
import styles from './index.less'

const Index = ({ setting, data }: any) => {
	const header = useHeader(setting, data)

	const update = useUpdate()

	useEffect(() => {
		const timer = setInterval(() => {
			update()
		}, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<div className={styles._local}>
			<div
				className='index flex justify_end align_center'
				style={{ width: (header.left_index.length - 1) * 150 }}
			>
				<div className='header_left_line header_line absolute'></div>
				<div className='header_left_mask header_mask absolute'></div>
				{header.left_index.map((item, index) => (
					<div
						className='index_item flex flex_column align_center justify_center'
						key={index}
					>
						<div className='value'>{item.value}</div>
						<div className='name'>{item.name}</div>
					</div>
				))}
			</div>
			<div className='border_wrap relative'>
				<div className='mask_bg absolute'></div>
				<div className='left_line line absolute'></div>
				<div className='left_mask mask absolute'></div>
				<div className='title_wrap flex flex_column justify_center align_center border_box'>
					<span className='title_text'>{setting.label}</span>
					<span className='date'>{new Date().toLocaleString()}</span>
				</div>
				<div className='right_line line absolute'></div>
				<div className='right_mask mask absolute'></div>
			</div>
			<div
				className='index flex align_center'
				style={{ width: (header.left_index.length - 1) * 150 }}
			>
				<div className='header_right_line header_line absolute'></div>
				<div className='header_right_mask header_mask absolute'></div>
				{header.right_index.map((item, index) => (
					<div
						className='index_item flex flex_column align_center justify_center'
						key={index}
					>
						<div className='value'>{item.value}</div>
						<div className='name'>{item.name}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
