export interface IMenu {
	id: number
	name: string
	icon: string
	path: string
	blocks?: boolean
	children?: Array<IMenuItem>
}

export interface IMenuItem extends Omit<IMenu, 'children' | 'blocks'> {
	visible_menu?: boolean
}
