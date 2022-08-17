import { useMemoizedFn } from 'ahooks'
import clsx from 'clsx'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { ActionArea, ViewArea } from './components'
import styles from './index.less'
import Model from './model'
import { preset } from './widgets'

import type { IPropsActionArea, IPropsViewArea, TabTypes, Widget } from './types'

const Index = () => {
	const [x] = useState(() => new Model())

	const setActiveTab = useMemoizedFn((active_tab: TabTypes) => (x.active_tab = active_tab))

	const props_action_area: IPropsActionArea = {
		active_tab: x.active_tab,
		widgets: preset,
		current_widget: x.focusing != -1 ? toJS(x.widgets[x.focusing]) : null,
		setCurrentWidget: useMemoizedFn(
			(settings: Widget) => (x.widgets[x.focusing] = settings)
		),
		setActiveTab
	}

	const props_view_area: IPropsViewArea = {
		widgets: toJS(x.widgets),
		setWidgets: useMemoizedFn((widgets) => (x.widgets = widgets)),
		removeWidget: useMemoizedFn((index) => x.widgets.splice(index, 1)),
		setFocusing: useMemoizedFn((focusing) => {
			x.focusing = focusing

			setActiveTab('Attributes')
		})
	}

	return (
		<div className={clsx([styles._local, 'w_100 flex'])}>
			<ActionArea {...props_action_area} />
			<ViewArea {...props_view_area} />
		</div>
	)
}

export default window.$app.memo(observer(Index))
