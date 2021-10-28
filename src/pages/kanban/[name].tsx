import { useFullscreen } from 'ahooks'
import { connect, history } from 'umi'

import { Page } from '@/components'

import Charts from './components/Charts'

import type { ConnectRC, IModelChart } from 'umi'

interface IProps {
	page_data: IModelChart
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data } = props

	const [_, { setFull }] = useFullscreen(document.body)

	if (!page_data?.setting?.label) return null

	const { setting, data } = page_data

	const props_charts = {
		setting,
		data
	}

	return (
		<Page
			title={setting.label}
			chart
			options={
				setting.page.option?.screen
					? [
							{
								title: '显示大屏',
								icon: 'icon-airplay',
								onClick: () => {
									history.push(setting.page.option.screen)

									setFull()
								}
							}
					  ]
					: undefined
			}
		>
			<Charts {...props_charts}></Charts>
		</Page>
	)
}

const getInitialProps = (model: any) => ({
	page_data: model[history.location.pathname]
})

export default window.$app.memo(connect(getInitialProps)(Index))
