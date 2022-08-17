import { Button } from 'antd'
import clsx from 'clsx'
import { ReactSortable } from 'react-sortablejs'

import { Icon } from '@/components'

import { Widgets } from '../../widgets'
import styles from './index.less'

import type { IPropsViewArea } from '../../types'

const Index = (props: IPropsViewArea) => {
	const { widgets, setWidgets, removeWidget, setFocusing } = props

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
					group={{ name: 'widgets', pull: false }}
					style={{ minHeight: '100%' }}
				>
					{widgets.map((item, index) => (
						<div className='widget_item flex flex_column' key={index}>
							<div className='top_wrap flex justify_between align_center'>
								<span className='label'>Filed Name</span>
								<div className='actions_wrap flex align_center'>
									<Icon
										className='icon_remove icon cursor_point clickable'
										name='icon-trash-2'
										size={16}
										onClick={() => removeWidget(index)}
									></Icon>
									<Icon
										className='icon_setting icon cursor_point clickable'
										name='icon-settings'
										size={16}
										onClick={() => setFocusing(index)}
									></Icon>
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
