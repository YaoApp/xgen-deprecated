import { useItemText } from '../hooks'

interface IProps {
	config: any
	value: any
	options: Array<any>
}

const Index = (props: IProps) => {
	const { config, value, options } = props

	const text =
		config.type === 'select'
			? useItemText(config, value, options)
			: `${config?.prefix}${value}`

	return <span className='text'>{text}</span>
}

export default window.$app.memo(Index)
