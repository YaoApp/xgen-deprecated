export const menu = [
	{
		id: 0,
		name: '数据大屏',
		icon: 'icon-activity',
		path: '/kanban'
	},
	{
		id: 1,
		name: '数据分析',
		icon: 'icon-pie-chart',
		path: '/service/sla',
		children: [
			{
				id: 11,
				name: '软件服务服务质量分析',
				path: '/service/sla'
			},
			{
				id: 12,
				name: '软件服务地域分析',
				path: '/service/area'
			},
			{
				id: 13,
				name: '软件服务垂直领域分析',
				path: '/service/fields'
			},
			{
				id: 14,
				name: '软件服务行业分析',
				path: '/service/industry'
			},
			{
				id: 15,
				name: '软件服务供需分析',
				path: '/service/needs'
			}
		]
	},
	{
		id: 2,
		name: '应用市场',
		icon: 'icon-grid',
		path: '/service/sla',
		blocks: true,
		children: [
			{
				id: 11,
				name: '服务质量',
				path: '/service/sla',
				icon: 'icon-compass'
			},
			{
				id: 12,
				name: '地域分析',
				path: '/service/area',
				icon: 'icon-crosshair'
			},
			{
				id: 13,
				name: '垂直领域',
				path: '/service/fields',
				icon: 'icon-shopping-bag'
			},
			{
				id: 14,
				name: '行业分析',
				path: '/service/industry',
				icon: 'icon-wind'
			},
			{
				id: 15,
				name: '供需分析',
				path: '/service/needs',
				icon: 'icon-anchor'
			},
			{
				id: 16,
				name: '服务质量',
				path: '/service/sla',
				icon: 'icon-compass'
			},
			{
				id: 17,
				name: '地域分析',
				path: '/service/area',
				icon: 'icon-crosshair'
			},
			{
				id: 18,
				name: '垂直领域',
				path: '/service/fields',
				icon: 'icon-shopping-bag'
			},
			{
				id: 19,
				name: '行业分析',
				path: '/service/industry',
				icon: 'icon-wind'
			},
			{
				id: 20,
				name: '供需分析',
				path: '/service/needs',
				icon: 'icon-anchor'
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
