import { makeAutoObservable } from 'mobx'

import type { Widget, TabTypes } from './types'

export default class Model {
	active_tab = 'Widgets' as TabTypes
	focusing = -1
	widgets = [] as Array<Widget>

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true })
	}
}
