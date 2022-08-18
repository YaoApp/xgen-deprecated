import { Input, InputNumber, Radio, Select } from 'antd'

import { config } from '../../widgets'
import styles from './index.less'

import type { IPropsAttributesArea } from '../../types'

const { Group } = Radio
const { Option } = Select

const Index = (props: IPropsAttributesArea) => {
	const { current_widget, setCurrentWidget } = props
	const attr_config = config[current_widget!.id] as any
	const attr_props = attr_config.props

	const onChange = (key: string, value: any, props?: boolean) => {
		if (!props) {
			setCurrentWidget({
				...current_widget,
				[key]: value
			})
		} else {
			setCurrentWidget({
				...current_widget,
				props: {
					...current_widget!.props,
					[key]: value
				}
			})
		}
	}

	return (
		<div className={styles._local}>
			{Object.keys(attr_config).map(
				(key, index) =>
					key !== 'props' && (
						<div className='attr_item flex flex_column' key={index}>
							<span className='label'>
								{attr_config[key]?.as ?? key}
							</span>
							<div className='value'>
								{attr_config[key].type === 'string' && (
									<Input
										value={(current_widget as any)[key]}
										placeholder={`Please input ${key}`}
										onChange={(e) =>
											onChange(key, e.target.value)
										}
										{...attr_config[key]?.props}
									></Input>
								)}
								{attr_config[key].type === 'number' && (
									<InputNumber
										value={(current_widget as any)[key]}
										placeholder={`Please input ${key}`}
										style={{ width: '100%' }}
										onChange={(value) =>
											onChange(key, value)
										}
										{...attr_config[key]?.props}
									></InputNumber>
								)}
							</div>
						</div>
					)
			)}
			{Object.keys(attr_props).map((key, index) => (
				<div className='attr_item flex flex_column' key={index}>
					<span className='label'>{key}</span>
					<div className='value'>
						{attr_props[key].type === 'string' && (
							<Input
								value={current_widget!.props[key]}
								placeholder={`Please input ${key}`}
								onChange={(e) =>
									onChange(key, e.target.value, true)
								}
								{...attr_props[key]?.props}
							></Input>
						)}
						{attr_props[key].type === 'number' && (
							<InputNumber
								value={current_widget!.props[key]}
								placeholder={`Please input ${key}`}
								style={{ width: '100%' }}
								onChange={(value) => onChange(key, value, true)}
								{...attr_props[key]?.props}
							></InputNumber>
						)}
						{attr_props[key].type === 'boolean' && (
							<div className='boolean_wrap w_100 border_box flex align_center'>
								<Group
									value={current_widget!.props[key]}
									{...attr_props[key]?.props}
									onChange={(e) =>
										onChange(key, e.target.value, true)
									}
								>
									<Radio value={true}>true</Radio>
									<Radio value={false}>false</Radio>
								</Group>
							</div>
						)}
						{attr_props[key].type === 'array' && (
							<Select
								mode='tags'
								open={false}
								value={current_widget!.props[key]}
								placeholder={`Please input ${key}`}
								style={{ width: '100%' }}
								onChange={(options) => {
									onChange(
										key,
										options.map((item: string) => {
											return {
												title: item,
												value: item
											}
										}),
										true
									)
								}}
							>
								{current_widget!.props[key].map((it: any) => (
									<Option key={it.title}>{it.value}</Option>
								))}
							</Select>
						)}
					</div>
				</div>
			))}
		</div>
	)
}

export default window.$app.memo(Index)
