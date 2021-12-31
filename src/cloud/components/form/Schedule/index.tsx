import styles from './index.less'

const Index = () => {
	return <div className={styles._local}></div>
}

export default window.$app.memo(Index)
