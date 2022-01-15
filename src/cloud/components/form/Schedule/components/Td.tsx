import Row from './Row'

interface IProps {
	setting: any
	onChange: any
}

const Index = (props: IProps) => {
	const { setting, onChange } = props

	return (
		<div className='td_wrap w_100 flex flex_column'>
			{setting.rows.map((item: any, index: number) =>
				item.children.map((it: any, idx: number) => (
					<Row
						setting={setting}
						it={it}
						parent_index={index}
						tag_index={idx}
						onChange={onChange}
						key={index + idx}
					></Row>
				))
			)}
		</div>
	)
}

export default window.$app.memo(Index)
