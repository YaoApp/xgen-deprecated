import { Page } from '@/components'

const Index = () => {
	return <Page title='page'>123</Page>
}

export default window.$app.memo(Index)
