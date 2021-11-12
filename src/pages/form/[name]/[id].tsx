import { connect, history, useParams } from 'umi'

import { Page } from '@/components'

import Anchor from './components/Anchor'
import Breadcrumb from './components/Breadcrumb'
import Form from './components/Form'

import type { ConnectRC, Dispatch, IModelForm } from 'umi'

interface IProps {
	page_data: IModelForm
	dispatch: Dispatch
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data, dispatch } = props
	const params = useParams<{ name: string; id: string }>()

	if (!page_data?.setting?.name) return null

	const { setting, data } = page_data

	const props_breadcrumb = {
		setting,
		params,
		dispatch
	}

	const props_form = {
		setting,
		data,
		dispatch
	}

	const props_anchor = {
		setting
	}

	return (
		<Page title={setting.name}>
			<div className='flex relative'>
				<div className='w_100 flex flex_column'>
					<Breadcrumb {...props_breadcrumb}></Breadcrumb>
					<Form {...props_form}></Form>
				</div>
				<div className='absolute top_0' style={{ width: 180, right: -180 }}>
					<Anchor {...props_anchor}></Anchor>
				</div>
			</div>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
