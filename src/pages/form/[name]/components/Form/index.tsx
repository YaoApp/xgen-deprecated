import { history, useParams } from 'umi'

import Form from '@/cloud/components/form/Form'

import type { Dispatch } from 'umi'

interface IProps {
	setting: any
	data: any
	dispatch: Dispatch
}

const Index = ({ setting = {}, data = {}, dispatch }: IProps) => {
	const params = useParams<{ name: string; id: string }>()

	const props_form = {
		setting,
		data,
		params,
		pathname: history.location.pathname,
		dispatch
	}

	return <Form {...props_form}></Form>
}

export default window.$app.memo(Index)
