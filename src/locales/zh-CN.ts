export default {
	login: {
		title: '登录系统',
		desc: '请使用管理员账号和登录密码登录系统',
		form: {
			btn_login_text: '立即登录',
			btn_user_text: '普通用户登录',
			validate: {
				email: '邮箱格式错误',
				mobile: '手机号格式错误'
			}
		}
	},
	table: {
		filter: {
			search: '搜索',
			reset: '重置'
		}
	},
	'table.list.total': '共查询到{total}条记录',
	form: {
		title: {
			add: '添加',
			view: '查看',
			edit: '编辑'
		},
		actions: {
			back: '返回',
			cancel: '取消',
			save: '保存'
		},
		more_actions: {
			delete: {
				action_title: '危险操作',
				tip: '请谨慎使用下列功能',
				btn_text: '删除',
				title: '删除数据',
				desc: '此操作将删除本条数据，这可能会影响关联数据分析结果。',
				confirm: {
					title: '确认删除',
					content: '删除之后数据不可恢复，请谨慎操作！'
				}
			}
		}
	}
}
