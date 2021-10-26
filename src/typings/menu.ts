export interface IMenu {
	id: number
	name: string
	icon: string
	path: string
	visible_menu?: boolean
	blocks?: boolean
	children?: Array<IMenu>
}
