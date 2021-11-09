import { useFullscreen } from 'ahooks'
import { useEffect } from 'react'
import { connect, history, useParams } from 'umi'

import { Charts, Page } from '@/components'
import useRequestInterval from '@/hooks/useRequestInterval'

import type { ConnectRC, IModelChart, Dispatch } from 'umi'

interface IProps {
	page_data: IModelChart
	dispatch: Dispatch
}

const Index: ConnectRC<IProps> = (props) => {
	const { page_data, dispatch } = props
	const { name } = useParams<{ name: string }>()

	const [_, { setFull }] = useFullscreen(document.body)

	useRequestInterval({
		name,
		pathname: history.location.pathname,
		page_data,
		dispatch
	})

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
