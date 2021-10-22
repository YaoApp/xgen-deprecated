interface IProps {
	value: string | number
}

const Index = ({ value }: IProps) => {
	return <span>{value || '-'}</span>
}

export default window.$app.memo(Index)
