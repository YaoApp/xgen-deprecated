import styles from './index.less'

interface IProps {
	avatar: JSX.Element
	name: JSX.Element
	desc: JSX.Element
}

const Index = (props: IProps) => {
	const { avatar, name, desc } = props

	return (
		<div className={styles._local}>
			<div className='left_wrap'>{avatar}</div>
			<div className='right_wrap flex flex_column justify_center'>
				<span className='name'>{name}</span>
				<span className='desc'>{desc}</span>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
