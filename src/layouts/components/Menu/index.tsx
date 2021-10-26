import { useBoolean, useDebounceEffect } from 'ahooks'
import { Input } from 'antd'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { history, Link } from 'umi'

import { Icon } from '@/components'
import { fuzzyQuery } from '@/utils/helpers/filters'

import styles from './index.less'

import type { IMenuItem } from '@/typings/menu'
import type { IPropsMenu } from '../../type'

const Index = (props: IPropsMenu) => {
	const { visible, blocks, title, items, setCurrentMenu } = props
	const [visible_input, { toggle }] = useBoolean(false)
	const [current_items, setCurrentItems] = useState<IPropsMenu['items']>([])
	const [input, setInput] = useState('')

	useEffect(() => {
		if (!items) return

		setCurrentItems(items)
	}, [items, visible_input])

	useDebounceEffect(
		() => {
			if (!input) return setCurrentItems(items)

			setCurrentItems(fuzzyQuery(items, input, 'name'))
		},
		[input],
		{ wait: 300 }
	)

	const onMenuItem = useCallback((item: IMenuItem, index: number) => {
		setCurrentMenu(index)
	}, [])

	return (
		<div className={clsx([styles._local, visible ? styles.visible : styles.unvisible])}>
			<div className='title_wrap w_100 border_box flex justify_between align_center relative'>
				{visible_input ? (
					<Input
						className='input'
						autoFocus
						placeholder='在菜单中搜索'
						onChange={({ target: { value } }) => setInput(value)}
					></Input>
				) : (
					<span className='title'>{title}</span>
				)}
				<a
					className={clsx([
						'icon_wrap flex justify_center align_center clickable',
						visible_input ? 'inputing' : ''
					])}
					onClick={() => toggle()}
				>
					{visible_input ? (
						<Icon name='icon-x' size={16}></Icon>
					) : (
						<Icon name='icon-search' size={16}></Icon>
					)}
				</a>
			</div>
			{visible && (
				<div className='menu_items_wrap w_100'>
					<div
						className={clsx([
							'menu_items w_100 border_box flex flex_column',
							blocks ? 'blocks' : ''
						])}
					>
						{current_items?.map((item, index) => (
							<Link
								className={clsx([
									'menu_item flex align_center transition_normal',
									item.path === history.location.pathname
										? 'active'
										: ''
								])}
								to={item.path}
								key={index}
								onClick={() => onMenuItem(item, index)}
							>
								<div className='icon_wrap flex justify_center align_center'>
									<Icon name={item.icon}></Icon>
								</div>
								<span className='text line_clamp_2'>
									{item.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default window.$app.memo(Index)
