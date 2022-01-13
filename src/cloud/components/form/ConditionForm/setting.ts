export default [
	{
		title: '您吃的最多的青菜是什么？',
		type: '单选',
		children: [
			{
				text: '白菜',
				score: 40
			},
			{
				text: '胡萝卜',
				score: 50
			},
			{
				text: '油麦菜',
				score: 60
			},
			{
				text: '玉米',
				score: 70
			}
		]
	},
	{
		type: '多选',
		title: '您一周大概喝几次酒？',
		children: [
			{
				text: '1次',
				score: 90
			},
			{
				text: '3次',
				score: 80
			},
			{
				text: '5次',
				score: 70
			},
			{
				text: '天天喝',
				score: 30
			}
		]
	},
	{
		type: '数字',
		title: '您给自己的身体状况打多少分？'
	},
	{
		type: '时间',
		title: '您上一次体检的时间？'
	},
	{
		type: '文本',
		title: '简单描述一下您的日常饮食？'
	}
]
