import { useEffect } from 'react'
import { history } from 'umi'

const Index = () => {
	const { location } = history

	useEffect(() => {
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	return (
		<iframe
			className='w_100 h_100vh'
			src={(location?.query?.src as string) || ''}
			frameBorder='0'
		></iframe>
	)
}

export default window.$app.memo(Index)
