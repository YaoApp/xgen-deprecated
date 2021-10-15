import { message } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { connect, history } from 'umi'

import styles from './index.less'

import type { Loading, IModelApp } from 'umi'

interface IProps {
	loading: boolean
	visible_menu: boolean
}

let path: any

const Index = (props: IProps) => {
	const { loading, visible_menu } = props
	const [visible, setVisible] = useState<boolean>(true)
	let close_loading: any

	useEffect(() => {
		if (path === history.location.pathname) {
			if (loading) close_loading = message.loading('loading', 0)
			if (!loading && close_loading) close_loading()

			return () => {
				if (close_loading) close_loading()
			}
		}

		if (loading) {
			setVisible(loading)
		} else {
			path = history.location.pathname

			const timer = setTimeout(() => setVisible(loading), 900)

			return () => clearTimeout(timer)
		}
	}, [loading, path, history.location.pathname])

	return (
		<div
			className={clsx([
				styles._local,
				visible ? styles.visible : '',
				loading ? styles.show : '',
				!visible_menu ? styles.fold : ''
			])}
		>
			<div className='wrap'>
				<div className='inner' />
				<div className='text'>loading</div>
			</div>
		</div>
	)
}

const getInitialProps = ({ loading, app }: { loading: Loading; app: IModelApp }) => ({
	loading: loading.global,
	visible_menu: app.visible_menu
})

export default connect(getInitialProps)(Index)
