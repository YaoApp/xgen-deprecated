import clsx from 'clsx'
import { useMemo } from 'react'

import { Icon } from '@/components'

import styles from './index.less'

interface IProps {
	title: string
	limit: 'upper' | 'lower'
	data: {
		max: number
		value: number
	}
	height?: number
}

const Index = (props: IProps) => {
	const { title, limit, data } = props

	const ok = useMemo(() => {
		if (limit === 'upper') {
			if (data.value <= data.max) return true
		} else {
			if (data.value >= data.max) return true
		}

		return false
	}, [limit, data])

	const percent = useMemo(() => {
		const target = {
			item: data.value,
			total: data.max,
			over: false,
			full: false
		}

		if (limit === 'upper') {
			if (data.value > data.max) {
				target.item = data.max
				target.total = data.value
				target.over = true
			} else {
			}
		} else {
			if (data.value >= data.max) {
				target.full = true
			}
		}

		return target
	}, [limit, data])

	return (
		<div
			className={clsx([
				styles._local,
				styles[limit],
				'w_100 border_box flex flex_column'
			])}
			style={{ height: props?.height ?? 'auto' }}
		>
			<div className='title_wrap flex justify_between align_center'>
				<span className='title'>{title}</span>
			</div>
			<div
				className='indicator_wrap w_100 border_box flex align_center'
				style={{
					height: props?.height ? `calc(${props.height}px - 29px)` : 'auto'
				}}
			>
				<div
					className={clsx([
						ok && 'ok',
						percent.over && 'over',
						percent.full && 'full',
						'line_wrap w_100 border_box'
					])}
				>
					<div className='line w_100 relative'>
						<span className='max absolute'>
							{!percent.over && (
								<span>{limit === 'upper' ? 'max' : 'min'}:</span>
							)}
							{percent.total}
						</span>
						<div
							className='value_item value flex flex_column align_end absolute'
							style={{
								width: percent.full
									? '100%'
									: (percent.item * 100) / percent.total + '%'
							}}
						>
							<span className='scale w_100'></span>
							<span className='number'>
								{percent.over && (
									<span>
										{limit === 'upper' ? 'max' : 'min'}:
									</span>
								)}
								{percent.item}
							</span>
						</div>
					</div>
				</div>
				{ok && (
					<div className='ok_wrap flex justify_center align_center'>
						<Icon
							className='icon_ok'
							name='icon-check-circle'
							size={27}
						></Icon>
					</div>
				)}
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
