export const fuzzyQuery = (list: Array<any>, word: string, key: string) => {
	var arr = []

	for (var i = 0; i < list.length; i++) {
		if (list[i][key].indexOf(word) >= 0) {
			arr.push(list[i])
		}
	}

	return arr
}

export const getDeepValue = (indexs: Array<string>, item: any) => {
	return indexs.reduce((total: any, it: any) => {
		total = total[it]

		return total
	}, item)
}

export const getDeepValueByText = (v: string, item: any) => {
	const key = v.replace(':', '')

	if (key.indexOf('.') !== -1) {
		const indexs = key.split('.')

		return indexs.reduce((total: any, it: any) => {
			total = total[it]

			return total
		}, item)
	}

	return item[key]
}

export const getGroupValue = (data: any, item: any) => {
	return data
		? Object.keys(data).reduce((total: any, key) => {
				total[key] = getDeepValueByText(data[key], item)

				return total
		  }, {})
		: {}
}

export const getFileSrc = (name: string) => {
	return `/api/xiang/storage/url?name=${name}&token=${sessionStorage.getItem('token') || ''}`
}
