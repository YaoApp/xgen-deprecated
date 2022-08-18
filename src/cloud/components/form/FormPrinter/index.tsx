import { useMemoizedFn } from 'ahooks'
import clsx from 'clsx'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

import { Item } from '@/components'

import { ActionArea, ViewArea } from './components'
import styles from './index.less'
import Model from './model'
import { preset } from './widgets'

import type { IPropsActionArea, IPropsViewArea, TabTypes, Widget } from './types'

const Printer = window.$app.memo(
	observer((props: ICustom) => {
		const [x] = useState(() => new Model())
		const [mounted, setMounted] = useState(false)
		const widgets = toJS(x.widgets)

		useEffect(() => setMounted(true), [])

		useEffect(() => {
			x.widgets = props.value
		}, [props.value])

		const setActiveTab = useMemoizedFn(
			(active_tab: TabTypes) => (x.active_tab = active_tab)
		)

		const props_action_area: IPropsActionArea = {
			active_tab: x.active_tab,
			widgets: preset,
			current_widget: x.focusing != -1 ? toJS(x.widgets[x.focusing]) : null,
			setCurrentWidget: useMemoizedFn((settings: Widget) => {
				x.widgets[x.focusing] = settings

				props.onChange?.(toJS(x.widgets))
			}),
			setActiveTab
		}

		const props_view_area: IPropsViewArea = {
			widgets: widgets ?? [],
			focusing: x.focusing,
			setWidgets: useMemoizedFn((widgets) => {
				if (!mounted) return

				x.widgets = widgets
				x.focusing = -1

				props.onChange?.(widgets)

				setActiveTab('Widgets')
			}),
			removeWidget: useMemoizedFn((index) => x.widgets.splice(index, 1)),
			setFocusing: useMemoizedFn((focusing) => {
				setActiveTab(focusing === -1 ? 'Widgets' : 'Attributes')

				x.focusing = focusing
			})
		}

		return (
			<div className={clsx([styles._local, 'w_100 flex'])}>
				<ActionArea {...props_action_area} />
				<ViewArea {...props_view_area} />
			</div>
		)
	})
)

interface ICustom {
	value?: any
	onChange?: (v: any) => void
}

const Custom = window.$app.memo((props: ICustom) => {
	return <Printer value={props.value} onChange={useMemoizedFn(props.onChange as any)}></Printer>
})

interface IProps {}

const Index = (props: IProps) => {
	return (
		<Item {...(props as any)}>
			<Custom {...props}></Custom>
		</Item>
	)
}

export default window.$app.memo(Index)
