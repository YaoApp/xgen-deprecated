export type WidgetTypes = 'Input' | 'Select'
export type TabTypes = 'Widgets' | 'Attributes'

import type Model from './model'

export interface Widget {
	id: WidgetTypes
	title: string
	bind: string
	width: number
	props: { [key: string]: any }
}

export interface IPropsActionArea {
	active_tab: TabTypes
	widgets: Array<Widget>
	current_widget: Widget | null
	setCurrentWidget: (settings: any) => void
	setActiveTab: (active_tab: TabTypes) => void
}

export interface IPropsWidgetsArea {
	widgets: Array<Widget>
}

export interface IPropsAttributesArea {
	current_widget: IPropsActionArea['current_widget']
	setCurrentWidget: IPropsActionArea['setCurrentWidget']
}

export interface IPropsViewArea {
	widgets: Array<Widget>
	focusing: Model['focusing']
	setWidgets: (...args: any) => void
	removeWidget: (index: number) => void
	setFocusing: (focusing: Model['focusing']) => void
}
