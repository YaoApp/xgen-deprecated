import { Page } from '@/components'

import Breadcrumb from './components/Breadcrumb'
import Form from './components/Form'

const Index = ({ setting = {}, data = {} }: any) => {
	if (!setting.name) return null

	return (
		<Page title={setting.name}>
			<Breadcrumb></Breadcrumb>
			<Form {...{ setting, data }}></Form>
		</Page>
	)
}

export default window.$app.memo(Index)
