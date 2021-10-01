import type { ReactNode } from 'react'
import type { IModelApp, Loading, Dispatch } from 'umi'
import type { IMenu } from '@/typings/menu'

export interface IProps {
	children: ReactNode
	loading: Loading
	app_data: IModelApp
	dispatch: Dispatch
}

export interface IPropsNav {
	menu: Array<IMenu>
	current_nav: IModelApp['current_nav']
	setCurrentNav: (current: IModelApp['current_nav']) => void
}

export interface IPropsOptions {
	setCurrentNav: (current: IModelApp['current_nav']) => void
}

export interface IPropsMenu {
	visible: boolean
	blocks: boolean
	title: IMenu['name']
	items: IMenu['children']
	current_menu: IModelApp['current_menu']
	setCurrentMenu: (current: IModelApp['current_menu']) => void
	setVisibleMenu: (v: IModelApp['visible_menu']) => void
}

export interface IPropsContainer {
	visible_menu: boolean
}
