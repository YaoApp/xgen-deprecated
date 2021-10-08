import config from 'R/config'

import styles from './index.less'

const Index = () => {
	return (
		<div className={styles._local}>
			<img className='logo' src={config.logo} alt='logo' />
		</div>
	)
}

export default window.$app.memo(Index)
