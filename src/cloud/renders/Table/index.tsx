import { Page } from '@/components'

import Filter from './components/Filter'
import List from './components/List'

const Index = ({ setting = {}, table, pagination }: any) => {
	if (!setting.decription) return null

	return (
		<Page title={setting.decription}>
			<Filter setting={setting}></Filter>
			<List {...{ setting, table, pagination }}></List>
		</Page>
	)
}

export default window.$app.memo(Index)
