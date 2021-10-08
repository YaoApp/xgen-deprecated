import store from 'store'

import styles from './index.less'

const Index = () => {
      const app_info = store.get('app_info')

	return (
		<div className={styles._local}>
			<span
				className='logo'
				style={{
					backgroundImage: `url(data:image/png;base64,${app_info.icons.png})`
				}}
			/>
		</div>
	)
}

export default window.$app.memo(Index)
