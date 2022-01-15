interface IProps {
	rows: Array<any>
}

const Index = (props: IProps) => {
	const { rows } = props

	return (
		<div className='left_wrap'>
			{rows.map((item: any, index: number) => (
				<div className='left_item flex' key={index}>
					<span className='time flex justify_center align_center'>
						{item.title}
					</span>
					<div className='children flex flex_column'>
						{item.children.map((it: any, idx: number) => (
							<span
								className='tag border_box flex justify_center align_center'
								style={{
									height: it?.rows ? it.rows * 42 : 42
								}}
								key={idx}
							>
								{it.title}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default window.$app.memo(Index)
