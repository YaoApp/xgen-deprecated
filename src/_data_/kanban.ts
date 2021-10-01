export const data_indicator = Array(20)
	.fill(undefined)
	.reduce((total, _, index) => {
		total.push({
			index,
			value: Math.round(Math.random() * 70 + 30)
		})

		return total
	}, [])

export const data_bar = [
	{
		name: '北京市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '上海市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '江苏市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '广东市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '贵州市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '河南市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '天津市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '浙江市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '四川市',
		value: Math.round(Math.random() * 70 + 30)
	},
	{
		name: '山东市',
		value: Math.round(Math.random() * 70 + 30)
	}
].sort((a, b) => b.value - a.value)

export const data_pie = [
	{
		name: '医疗',
		value: 44
	},
	{
		name: '教育',
		value: 53
	},
	{
		name: '零售',
		value: 13
	},
	{
		name: '电商',
		value: 43
	},
	{
		name: '政府',
		value: 22
	}
]
