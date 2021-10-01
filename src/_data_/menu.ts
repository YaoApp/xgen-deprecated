export const menu = [
	{
		id: 0,
		name: '数据大屏',
		icon: 'icon-activity',
		path: '/kanban'
	},
	{
		id: 2,
		name: '可信云云服务库',
		icon: 'icon-cloud',
		path: '/service/list',
		blocks: true,
		children: [
			{
				id: 11,
				name: '云服务库',
				path: '/service/list',
				icon: 'icon-list',
				visible_menu: true
			},
			{
				id: 12,
				name: '添加服务',
				path: '/service/create',
				icon: 'icon-plus',
				visible_menu: false
			}
		]
	},
	{
		id: 3,
		name: '错误报告',
		icon: 'icon-tool',
		path: '/bug/list',
		blocks: true,
		children: [
			{
				id: 11,
				name: '报告列表',
				path: '/bug/list',
				icon: 'icon-list',
				visible_menu: true
			},
			{
				id: 12,
				name: '创建报告',
				path: '/bug/create',
				icon: 'icon-plus',
				visible_menu: false
			}
		]
	}
]
