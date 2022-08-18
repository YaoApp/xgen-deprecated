const common = {
	id: {
		as: 'type',
		type: 'string',
		props: {
			readOnly: true
		}
	},
	title: {
		type: 'string'
	},
	bind: {
		type: 'string'
	},
	width: {
		type: 'number',
		props: {
			max: 24
		}
	}
}

export default {
	Input: {
		...common,
		props: {
			placeholder: {
				type: 'string'
			},
			maxLength: {
				type: 'number'
			}
		}
	},
	Select: {
		...common,
		props: {
			placeholder: {
				type: 'string'
			},
			showSearch: {
				type: 'boolean'
			},
			options: {
				type: 'array',
				object: {
					title: 'string',
					value: 'string'
				}
			}
		}
	}
}
