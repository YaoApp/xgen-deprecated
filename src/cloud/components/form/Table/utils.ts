import moment from 'moment'

import { getDeepValue } from '@/utils/helpers/filters'

export const getText = (dataIndex: string, dataItem: any, v: any, item: any, _columns: any) => {
	let text = v

	if (dataIndex.indexOf('.') !== -1) {
		if (dataIndex in dataItem) {
			text = dataItem[dataIndex]
		} else {
			text = getDeepValue(dataIndex.split('.'), dataItem)
		}
	}

	if (item.title && _columns[item.title].view.props['format']) {
		text = v ? moment(v).format(_columns[item.title].view.props['format']) : '-'
	}

	if (item.view.type === 'image' || item.view.type === 'tag') {
		return text
	}

	return Array.isArray(text) ? text.join(',') : text !== undefined && text !== null ? text : '-'
}

export const getTargetValue = (v: string, key: string, dataItem: any) => {
	if (v.indexOf(':') === 0) {
		const _v = v.replace(':', '')

		if (_v.indexOf('.') !== -1) {
			if (key in dataItem) {
				return { [key]: dataItem[_v] }
			} else {
				return {
					[key]: getDeepValue(_v.split('.'), dataItem)
				}
			}
		} else {
			return {
				[key]: dataItem[_v]
			}
		}
	}

	return {}
}

// bind vars :xxx
export const bindDataItem = (value: any, dataItem: any) => {
	var flattenItem: { [key: string]: any } = {}
	dot(flattenItem, dataItem)
	var type = typeof value
	if (type == 'string' && value.indexOf(':') === 0) {
		var key = value.slice(1)
		var res = flattenItem[key] || ''
		return res
	} else if (type == 'object') {
		var res: any = {}
		for (var k in value) {
			res[k] = bindDataItem(value[k], dataItem)
		}
		return res
	}
	return value
}

// {"foo":"bar", "item":{"hello":"world"}} =>  {"foo":"bar", "item":{"hello":"world"}, "item.hello":"world"}
export const dot = (
	flatten: { [key: string]: any },
	object: { [key: string]: any },
	prefix: string = ''
) => {
	flatten = flatten || {}
	for (var key in object) {
		var value = object[key]
		var type = typeof value
		flatten[`${prefix}${key}`] = object[key]
		if (typeof value == 'object') {
			dot(flatten, object[key], `${prefix}${key}.`)
		}
	}
}
