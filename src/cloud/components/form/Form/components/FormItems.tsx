import { Col, Row, Tabs } from 'antd'
import { Fragment } from 'react'

import Dynamic from '@/cloud/core'
import { Card } from '@/components'
import { getDeepValueByText } from '@/utils/helpers/filters'

const { TabPane } = Tabs

export interface IProps {
	fieldset: Array<any>
	params: {
		id: string
		name: string
	}
	type: string
	data: any
	searchFormData: () => void
}

const Index = (props: IProps) => {
	const { fieldset, params, type, data, searchFormData } = props

	const getFormItem = (it: any, idx: number) => {
		if (it.edit.type === 'table' && params.id === '0') {
			return null
		}

		if (it.edit.type === 'table' && params.id !== '0') {
			let other_props: any = {}

			if (it.edit.props?.update_form) {
				other_props['searchFormData'] = searchFormData
			}

			return (
				<Col span={it.span} key={idx}>
					<Dynamic
						type='form'
						name='table'
						props={{
							...it.edit.props,
							...other_props,
							type,
							label: it.label,
							queryDataSource: data
						}}
					></Dynamic>
				</Col>
			)
		}

		if (it.edit.type === 'quickTable') {
			return (
				<Col span={it.span} key={idx}>
					<Dynamic
						type='form'
						name='quickTable'
						props={{
							...it.edit.props,
							name: it.edit.props.value,
							type,
							label: it.label,
							rules: type === 'view' ? [] : it.rules
						}}
					></Dynamic>
				</Col>
			)
		}

		if (it.edit.type === 'chart') {
			const chart_data = getDeepValueByText(it.edit.props.value, data)

			return (
				<Col span={it.span} key={idx}>
					<a
						id={it.label}
						className='table_item_title inline_block disabled'
						href={`#${it.label}`}
					>
						{it.label}
					</a>
					<Card>
						<Dynamic
							type='chart'
							name={it.edit.props.type}
							props={{
								name: it.label,
								data: chart_data,
								...it.edit.props.chart_props
							}}
							key={idx}
						></Dynamic>
					</Card>
				</Col>
			)
		}

		return (
			<Col span={it.span} key={idx}>
				<Dynamic
					type='form'
					name={it.edit.type}
					props={{
						...it.edit.props,
						name: it.edit.props.value,
						label: it.label,
						rules: type === 'view' ? [] : it.rules,
						disabled: type === 'view'
					}}
				></Dynamic>
			</Col>
		)
	}

	const getTabs = (it: any, index: number) => {
		return (
			<Tabs className='w_100' key={index} style={{ padding: '0 8px' }}>
				{it.items.map((a: any, b: number) => (
					<TabPane tab={a.name} key={index + b}>
						<Row gutter={16} wrap={true}>
							{a.columns.map((x: any, y: number) => {
								return getFormItem(x, index + b + y)
							})}
						</Row>
					</TabPane>
				))}
			</Tabs>
		)
	}

	return (
		<Fragment>
			{fieldset.map((item, index) => (
				<div className='form_item w_100 border_box flex flex_column' key={index}>
					<a
						id={item.title}
						className='form_item_title_wrap flex flex_column disabled'
						href={`#${item.title}`}
					>
						<span className='section_title'>{item.title}</span>
						<span className='desc'>{item.description}</span>
					</a>
					<Row gutter={16} wrap={true}>
						{item.columns.map((it: any, idx: number) => {
							if (it.tab) {
								return getTabs(it, index + idx)
							} else {
								return getFormItem(it, index + idx)
							}
						})}
					</Row>
				</div>
			))}
		</Fragment>
	)
}

export default window.$app.memo(Index)
