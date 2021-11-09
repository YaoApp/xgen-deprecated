import { useEffect } from 'react'

import type { Dispatch } from 'umi'

interface IProps {
	name: string
	pathname: string
	page_data: any
	dispatch: Dispatch
}

const Index = ({ name, pathname, page_data, dispatch }: IProps) => {
	useEffect(() => {
		if (!page_data?.setting) return

		const timer = setInterval(() => {
			dispatch({
				type: `${pathname}/search`,
				payload: { name }
			})
		}, page_data?.setting?.page?.option?.request_interval * 1000 || 30 * 1000)

		return () => clearInterval(timer)
	}, [page_data, name])
}

export default Index
