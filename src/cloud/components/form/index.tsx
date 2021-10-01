import Dynamic from '@/cloud/core'

interface IProps {
	type: 'input' | 'select'
	props: { [key: string]: any }
}

const Index = ({ type, props }: IProps) => {
	return (
		<Dynamic
			category='components'
			type='base'
			name={type.replace(/^\S/, (s) => s.toUpperCase())}
			props={props}
		></Dynamic>
	)
}

export default window.$app.memo(Index)
