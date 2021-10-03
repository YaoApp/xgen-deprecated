export const menu = [
	{
		id: 0,
		name: '数据大屏',
		icon: 'icon-activity',
		path: '/kanban',
		children: []
	},
	{
		id: 2,
		name: '可信云云服务库',
		icon: 'icon-cloud',
		path: '/list/service',
		blocks: true,
		children: [
			{
				id: 11,
				name: '可信云云服务库',
				path: '/list/service',
				icon: 'icon-list',
				visible_menu: true
			},
			{
				id: 12,
				name: '添加云服务库',
				path: '/form/service/0',
				icon: 'icon-plus',
				visible_menu: false
			}
		]
	}
]
