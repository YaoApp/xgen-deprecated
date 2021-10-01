declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
	export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
	const url: string
	export default url
}

declare module 'less-vars-to-js'
declare module '@lcdp/offline-plugin'
declare module 'dva-model-extend' {
	import type { Model } from 'R/src/typings/dva'

	const modelExtend: (common_model: Model, target_model: Model) => Model

	export default modelExtend
}

interface Window {
	$app: {
		memo: <T>(
			el: (props: T) => JSX.Element | null
		) => React.MemoExoticComponent<(props: T) => JSX.Element | null>
	}
}
