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
