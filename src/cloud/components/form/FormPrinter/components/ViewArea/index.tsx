import { Button } from 'antd'
import clsx from 'clsx'
import { ReactSortable } from 'react-sortablejs'

import { Icon } from '@/components'

import { Widgets } from '../../widgets'
import styles from './index.less'

import type { IPropsViewArea } from '../../types'

const Index = (props: IPropsViewArea) => {
	const { widgets, focusing, setWidgets, removeWidget, setFocusing } = props

	return (
		<div className={clsx([styles._local, 'border_box flex flex_column'])}>
			<div className='title_wrap flex justify_between align_center'>
				<span className='form_fileds_title'>Form Fileds</span>
				<Button size='small' onClick={() => setWidgets([])}>
					Clear All
				</Button>
			</div>
			<div className='droppable_wrap w_100 border_box'>
				<ReactSortable
					list={widgets}
					setList={setWidgets}
					animation={300}
					handle='.icon_move'
					group={{ name: 'widgets', pull: false }}
					style={{ minHeight: '100%' }}
				>
					{widgets.map((item, index) => (
						<div
							className={clsx([
								'widget_item flex flex_column border_box',
								focusing === index && 'active'
							])}
							key={index}
							onClick={() => setFocusing(index)}
						>
							<div className='top_wrap flex justify_between align_center'>
								<div className='label'>
									{item.title ? item.title : 'title'}
									<span className='ml_6 mr_6'>·</span>
									{item.bind ? item.bind : 'bind'}
								</div>
								<div className='actions_wrap flex align_center'>
									<div
										className='icon_wrap flex'
										onClick={(e) => {
											e.stopPropagation()

											setFocusing(-1)
											removeWidget(index)
										}}
									>
										<Icon
											className='icon_remove icon cursor_point clickable'
											name='icon-trash-2'
											size={16}
										></Icon>
									</div>
									<Icon
										className='icon_move icon'
										name='icon-move'
										size={16}
									></Icon>
								</div>
							</div>
							<Widgets type={item.id} props={item.props}></Widgets>
						</div>
					))}
				</ReactSortable>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
