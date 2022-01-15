import { useMount } from 'ahooks'
import qs from 'query-string'
import { Fragment, useState } from 'react'
import { request } from 'umi'

import Cell from './Cell'

interface IProps {
	setting: any
	it: any
	parent_index: number
	tag_index: number
	onChange: any
}

const Index = (props: IProps) => {
	const { setting, it, parent_index, tag_index, onChange } = props
	const [options, setOptions] = useState<Array<any>>([])
	const cell = setting.cell
	const tag = it.title

	const getOptions = async () => {
		const { props } = cell[0]
		const _props: any = {}

		if (props.remote?.query) {
			_props['remote'] = {
				...props.remote,
				query: {
					...props.remote.query,
					tag
				}
			}
		} else {
			_props['remote'] = {
				...props.remote,
				query: { tag }
			}
		}

		let v = ''
		let select = ''
		let query_string = ''

		if (_props.remote?.query) {
			const { select, useValue, ...other_query } = _props.remote.query

			query_string = qs.stringify(other_query)
		}

		if (_props.remote?.query?.useValue) {
			v = `&value=${_props.value}`
		}

		if (_props.remote?.query?.select) {
			select = `select=${_props.remote.query.select.join(',')}`
		}

		const data = await request(`${_props.remote.api}?${select}${v}${query_string}`)

		setOptions(data)
	}

	useMount(() => {
		getOptions()
	})

	if (it?.rows) {
		return (
			<Fragment>
				{Array(it.rows)
					.fill({})
					.map((_: any, y: number) => (
						<div className='td_row flex' key={parent_index + tag_index + y}>
							{setting.days.map((_: string, key: number) => (
								<Cell
									cell={setting.cell}
									rows={setting.rows}
									tag={tag}
									parent_index={parent_index}
									tag_index={tag_index}
									tag_rows_index={y}
									day_index={key}
									options={options}
									onChange={onChange}
									key={parent_index + tag_index + y + key}
								></Cell>
							))}
						</div>
					))}
			</Fragment>
		)
	}

	return (
		<div className='td_row flex' key={parent_index + tag_index}>
			{setting.days.map((_: string, key: number) => (
				<Cell
					cell={setting.cell}
					rows={setting.rows}
					tag={tag}
					parent_index={parent_index}
					tag_index={tag_index}
					day_index={key}
					options={options}
					onChange={onChange}
					key={parent_index + tag_index + key}
				></Cell>
			))}
		</div>
	)
}

export default window.$app.memo(Index)
