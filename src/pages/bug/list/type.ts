import type { IModelBugList } from 'umi'

export interface IProps {
	loading: boolean | undefined
	page_data: IModelBugList
}

export interface IPropsFilter {}

export interface IPropsList {
	list: IModelBugList['list']
}
