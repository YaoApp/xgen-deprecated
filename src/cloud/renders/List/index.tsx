import { Page } from '@/components'
import Filter from './Filter'
import Table from './Table'

const Index = (data: any) => {
      if (!data.decription) return null
      
	return (
		<Page title={data.decription}>
			<Filter data={data}></Filter>
			<Table data={data}></Table>
		</Page>
	)
}

export default window.$app.memo(Index)
