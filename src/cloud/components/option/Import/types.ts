export interface IProps {
	api: {
		setting: string
		mapping: string
		mapping_setting: string
		preview: string
		preview_setting: string
		import: string
	}
	operation: Array<any>
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
	setPreviewPayload: (v: any) => void
}

export interface IPropsStep3 {
	api: IProps['api']
	preview_payload: any
}

export interface IPropsStep4 {
	api: IProps['api']
	preview_payload: any
}
