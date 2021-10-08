import { Page } from '@/components'

import Filter from './components/Filter'
import Table from './components/Table'

const Index = ({ setting = {}, list, pagination }: any) => {
	if (!setting.decription) return null

	return (
		<Page title={setting.decription}>
			<Filter setting={setting}></Filter>
			<Table {...{ setting, list, pagination }}></Table>
		</Page>
	)
}

export default window.$app.memo(Index)
