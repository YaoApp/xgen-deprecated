export const fuzzyQuery = (list: Array<any>, word: string, key: string) => {
	var arr = []

	for (var i = 0; i < list.length; i++) {
		if (list[i][key].indexOf(word) >= 0) {
			arr.push(list[i])
		}
	}

	return arr
}
