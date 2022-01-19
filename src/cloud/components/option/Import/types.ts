export interface IProps {
	api: {
		setting: string
		preview: string
		preview_setting: string
		mapping: string
		mapping_setting: string
		import: string
	}
}

export interface IPropsSteps {
	step: number
}

export interface IPropsStep1 {
	file_name: string
	setFileName: (v: string) => void
	next: () => void
}

export interface IPropsStep2 {
	api: IProps['api']
	file_name: string
}
