import { ReactSortable } from 'react-sortablejs'

import { Icon } from '@/components'

import { Widgets } from '../../widgets'
import styles from './index.less'

import type { IPropsWidgetsArea } from '../../types'

const Index = (props: IPropsWidgetsArea) => {
	const { widgets } = props

	return (
		<div className={styles._local}>
			<ReactSortable
				list={widgets}
				animation={300}
				sort={false}
				handle='.icon_move'
				group={{ name: 'widgets', pull: 'clone', put: false }}
				setList={() => {}}
			>
				{widgets.map((item) => (
					<div className='widget_item flex flex_column' key={item.id}>
						<div className='top_wrap flex justify_between align_center'>
							<span className='label'>{item.id}</span>
							<Icon
								className='icon_move'
								name='icon-move'
								size={16}
							></Icon>
						</div>
						<Widgets type={item.id} props={item.props}></Widgets>
					</div>
				))}
			</ReactSortable>
		</div>
	)
}

export default window.$app.memo(Index)
