import { lazy, Suspense } from 'react'

type RendersType = 'Table' | 'Form' | 'Kanban'
type ComponentsType = 'base' | 'form'

interface IProps {
	category: 'renders' | 'components'
	type: RendersType | ComponentsType
	name?: string
	props: { [key: string]: any }
}

const Index = ({ category, type, name, props }: IProps) => {
	const Component = lazy(() => import(`@/cloud/${category}/${type}${name ? '/' + name : ''}`))

	return (
		<Suspense fallback={''}>
			<Component {...props} />
		</Suspense>
	)
}

export default window.$app.memo(Index)
