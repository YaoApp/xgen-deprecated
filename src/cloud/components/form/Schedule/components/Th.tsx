interface IProps {
	days: Array<string>
}

const Index = (props: IProps) => {
	const { days } = props

	return (
		<div className='th_wrap w_100 border_box flex'>
			{days.map((item: string, index: number) => (
				<span
					className='th border_box flex justify_center align_center'
					key={index}
				>
					{item}
				</span>
			))}
		</div>
	)
}

export default window.$app.memo(Index)
