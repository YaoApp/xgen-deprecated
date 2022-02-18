export default {
	login: {
		title: 'Login System',
		desc: 'Please use the administrator account and login password to log in to the system',
		form: {
			btn_login_text: 'Login',
			btn_user_text: 'Ordinary user login',
			validate: {
				email: 'The email format is incorrect',
				mobile: 'Mobile phone number format error'
			}
		}
	},
	table: {
		filter: {
			search: 'Search',
			reset: 'Reset'
		}
	},
	'table.list.total': '{total} records were queried',
	form: {
		title: {
			add: 'Add ',
			view: 'View ',
			edit: 'Edit '
		},
		actions: {
			back: 'back',
			cancel: 'cancel',
			save: 'save'
		},
		more_actions: {
			delete: {
				action_title: 'Dangerous Action',
				tip: 'Please use the following functions with caution',
				btn_text: 'Delete',
				title: 'Delete data',
				desc:
					'This operation will delete this piece of data, which may affect the results of linked data analysis. ',
				confirm: {
					title: 'Confirm delete',
					content:
						'Data cannot be recovered after deletion, please operate with caution! '
				}
			}
		}
	}
}
