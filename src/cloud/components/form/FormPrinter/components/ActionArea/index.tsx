import { Tabs } from 'antd'
import clsx from 'clsx'

import AttributesArea from '../AttributesArea'
import WidgetsArea from '../WidgetsArea'
import styles from './index.less'

const { TabPane } = Tabs

import type {
	IPropsActionArea,
	IPropsWidgetsArea,
	IPropsAttributesArea,
	TabTypes
} from '../../types'

const Index = (props: IPropsActionArea) => {
	const { active_tab, widgets, current_widget, setCurrentWidget, setActiveTab } = props

	const props_widgets_area: IPropsWidgetsArea = {
		widgets
	}

	const props_attributes_area: IPropsAttributesArea = {
		current_widget,
		setCurrentWidget
	}

	return (
		<div className={clsx([styles._local, 'border_box'])}>
			<Tabs
				defaultActiveKey='1'
				onChange={(active) => setActiveTab(active as TabTypes)}
				activeKey={active_tab}
			>
				<TabPane tab='Components' key='Widgets'>
					<WidgetsArea {...props_widgets_area} />
				</TabPane>
				<TabPane tab='Attributes' key='Attributes'>
					{current_widget && <AttributesArea {...props_attributes_area} />}
				</TabPane>
			</Tabs>
		</div>
	)
}

export default window.$app.memo(Index)
