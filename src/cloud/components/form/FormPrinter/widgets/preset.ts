import type { Widget } from '../types'

export default [
	{
		id: 'Input',
		props: {
			placeholder: 'This is a Input, for text field.'
		}
	},
	{
		id: 'Select',
		props: {
			placeholder: 'This is a Select, for options field.',
			options: [
				{
					title: 'Apple',
					value: 'Apple'
				},
				{
					title: 'Orange',
					value: 'Orange'
				},
				{
					title: 'Peach',
					value: 'Peach'
				}
			]
		}
	}
] as Array<Widget>
