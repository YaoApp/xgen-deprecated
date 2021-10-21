import { lazy, Suspense, useCallback } from 'react'

type ComponentsType = 'base' | 'form' | 'chart' | 'group'

interface IProps {
	type: ComponentsType
	name: string
	props: { [key: string]: any }
}

const Index = ({ type, name, props }: IProps) => {
	const getName = useCallback((name: string) => name.replace(/^\S/, (s) => s.toUpperCase()), [])

	const Component = lazy(() => import(`@/cloud/components/${type}/${getName(name)}`))

	return (
		<Suspense fallback={null}>
			<Component {...props} />
		</Suspense>
	)
}

export default window.$app.memo(Index)
