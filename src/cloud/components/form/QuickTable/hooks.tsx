import { Form } from 'antd'
import { useMemo } from 'react'

import Dynamic from '@/cloud/core'
import { Icon } from '@/components'

export const useColumns = (
	setting: any,
	options: {
		data: any
		getData: () => Promise<void>
		save: (data: any) => void
		add: (index: number) => void
		remove: (index: number) => void
	}
) => {
	const columns = useMemo(() => {
		if (!setting.columns) return []

		const _columns = setting.columns
		const _layouts = setting.list.layout.columns

		const columns = _layouts.reduce((total: Array<any>, it: any, index: number) => {
			const item = {
				..._columns[it.name],
				...it,
				title: it.name
			}

			if (it.width) item['width'] = it.width

			const key = _columns[item.label].edit.props.value.replace(':', '')

			item.dataIndex = key

			item.render = (value: any) => {
				return (
					<Form
						className='w_100'
						name={`form_quick_table_td_${key}_${index}`}
						initialValues={{
							[key]: value
						}}
					>
						<Dynamic
							type='form'
							name={item.edit.type}
							props={{
								...item.edit.props,
								name: key,
								label: item.title,
								value,
								style: { width: '100%' }
							}}
						></Dynamic>
					</Form>
				)
			}

			total.push(item)

			return total
		}, [])

		columns.push({
			title: '操作',
			dataIndex: 'options',
			width: 100,
			render: (a: any, b: any, index: number) => (
				<div className='table_options flex justify_end'>
					<a
						className='btn_option flex justify_center align_center cursor_point clickable'
						onClick={() => options.add(index)}
					>
						<Icon name='icon-plus' size={20}></Icon>
					</a>
					<a
						className='btn_option flex justify_center align_center cursor_point clickable'
						onClick={() => options.remove(index)}
					>
						<Icon name='icon-x-circle' size={18}></Icon>
					</a>
				</div>
			)
		})

		return columns
	}, [setting, options.data])

	return columns
}
