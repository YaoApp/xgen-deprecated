import { connect } from 'umi'
import { Page } from '@/components'
import Breadcrumb from './components/Breadcrumb'
import Form from './components/Form'
import type { IModelBugCreate, Loading } from 'umi'
import type { IProps } from './type'

const Index = (props: IProps) => {
	const {} = props

	return (
		<Page title='创建报告'>
			<Breadcrumb></Breadcrumb>
			<Form></Form>
		</Page>
	)
}

const getInitialProps = ({
	loading,
	bug_create
}: {
	loading: Loading
	bug_create: IModelBugCreate
}) => ({
	loading: loading.effects['bug_create/query'],
	page_data: bug_create
})

export default window.$app.memo(connect(getInitialProps)(Index))
