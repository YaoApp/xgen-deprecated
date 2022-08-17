import { Input, Select } from './index'

import type { WidgetTypes, Widget } from '../types'

interface IWidgets {
	type: WidgetTypes
	props: Widget['props']
}

export default ({ type, props = {} }: IWidgets) => {
	if (type === 'Input') return <Input {...props} />
	if (type === 'Select') return <Select {...props} />

	return null
}
