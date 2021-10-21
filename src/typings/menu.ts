export interface IMenu {
	id: number
	name: string
	icon: string
	path: string
	visible_menu?: boolean
	blocks?: boolean
	children?: Array<IMenuItem>
}

export interface IMenuItem extends Omit<IMenu, 'children' | 'blocks'> {}
