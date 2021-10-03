const colors = [
	'#e57373',
	'#FF9800',
	'#64B5F6',
	'#AED581',
	'#4DD0E1',
	'#5C6BC0',
	'#BA68C8',
	'#F06292',
	'#FF8A65',
	'#90A4AE',
	'#FFB74D'
]

export const getColor = (index: number) => colors[index % colors.length]
