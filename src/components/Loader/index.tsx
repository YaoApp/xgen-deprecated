import { connect } from 'umi'

import styles from './index.less'

import type { IModelApp } from 'umi'

const Index = (props: any) => {
	const { visible_menu } = props

	return (
		<div
			className={`
                        ${styles._local} 
                        ${!visible_menu ? styles.fold : ''} 
                  `}
		>
			<div className='wrap'>
				<div className='inner' />
				<div className='text'>loading</div>
			</div>
		</div>
	)
}

const getInitialProps = ({ app }: { app: IModelApp }) => ({
	visible_menu: app.visible_menu
})

export default window.$app.memo(connect(getInitialProps)(Index))
