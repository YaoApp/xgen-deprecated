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
	OSS: any
	$app: {
		memo: <T>(
			el: (props: T) => JSX.Element | null
		) => React.MemoExoticComponent<(props: T) => JSX.Element | null>
		nextTick: () => Promise<unknown>
		sleep: (time: number) => Promise<unknown>
		emitter: Emitter<Record<EventType, unknown>>
		oss: any
	}
}

type EventType = string | symbol
type Handler<T = unknown> = (event: T) => void
type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void
type EventHandlerList<T = unknown> = Array<Handler<T>>
type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>
type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
	keyof Events | '*',
	EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>
interface Emitter<Events extends Record<EventType, unknown>> {
	all: EventHandlerMap<Events>
	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void
	on(type: '*', handler: WildcardHandler<Events>): void
	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void
	off(type: '*', handler: WildcardHandler<Events>): void
	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
	emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void
}
