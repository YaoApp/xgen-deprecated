import type { Loading, Dispatch, IModelApp } from 'umi'
import type { IMenu } from '@/typings/menu'

export interface IProps {
	children: JSX.Element
	loading: Loading
	app_data: IModelApp
	dispatch: Dispatch
}

export interface IPropsNav {
	app_info: IModelApp['app_info']
	user: IModelApp['user']
	menu: Array<IMenu>
	current_nav: IModelApp['current_nav']
	getUserMenu: () => void
	setCurrentNav: (current: IModelApp['current_nav']) => void
}

export interface IPropsOptions {
	app_info: IModelApp['app_info']
	user: IModelApp['user']
	setCurrentNav: (current: IModelApp['current_nav']) => void
	getUserMenu: () => void
}

export interface IPropsMenu {
	visible: boolean
	blocks: boolean
	title: IMenu['name']
	items: Array<any>
	current_menu: IModelApp['current_menu']
	setCurrentMenu: (current: IModelApp['current_menu']) => void
}

export interface IPropsContainer {
	visible_menu: boolean
}
