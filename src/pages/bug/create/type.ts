import type { Dispatch, IModelBugCreate } from 'umi'

export interface IProps {
	loading: boolean | undefined
	page_data: IModelBugCreate
	dispatch: Dispatch
}
