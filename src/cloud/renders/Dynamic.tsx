import { dynamic } from 'umi'

export interface IProps {
	type: 'base'
	name: string
}

const Component = ({ type, name }: IProps) => {
	return dynamic({
		loader: async () => {
			const {} = await import(`@/cloud/components/${type}/${name}`)
		},
		loading: () => <div>loading</div>
	})
}

export default window.$app.memo(Component)
