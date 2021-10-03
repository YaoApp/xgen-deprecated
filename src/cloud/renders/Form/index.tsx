import { Page } from '@/components'
import Breadcrumb from './components/Breadcrumb'
import Form from './components/Form'

const Index = ({ setting = {}, data = {} }: any) => {
	if (!setting.decription) return null

	return (
		<Page title={setting.decription}>
			<Breadcrumb></Breadcrumb>
			<Form {...{ setting, data }}></Form>
		</Page>
	)
}

export default window.$app.memo(Index)
