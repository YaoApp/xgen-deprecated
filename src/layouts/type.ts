import type { IModelApp, Dispatch } from 'umi'
import type { IMenu } from '@/typings/menu'

export interface IProps {
	children: JSX.Element
	app_data: IModelApp
	dispatch: Dispatch
}

export interface IPropsNav {
	user: IModelApp['user']
	menu: Array<IMenu>
	current_nav: IModelApp['current_nav']
	setCurrentNav: (current: IModelApp['current_nav']) => void
}

export interface IPropsOptions {
	user: IModelApp['user']
	setCurrentNav: (current: IModelApp['current_nav']) => void
}

export interface IPropsMenu {
	visible: boolean
	blocks: boolean
	title: IMenu['name']
	items: Array<any>
	current_menu: IModelApp['current_menu']
	setCurrentMenu: (current: IModelApp['current_menu']) => void
	setVisibleMenu: (v: IModelApp['visible_menu']) => void
}

export interface IPropsContainer {
	visible_menu: boolean
}
