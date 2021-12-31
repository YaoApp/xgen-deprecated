import clsx from 'clsx'

import styles from './index.less'

interface IProps {
	label: string
}

const Index = (props: IProps) => {
	return (
		<div className={clsx([styles._local, 'flex flex_column'])}>
			<a
				id={props.label}
				className='table_item_title inline_block disabled'
				href={`#${props.label}`}
			>
				{props.label}
			</a>
			<div className='schedule_wrap w_100'>
				<table className='table w_100'>
					<thead>
						<tr>
							<th colSpan={2}></th>
							<th>周一</th>
							<th>周二</th>
							<th>周三</th>
							<th>周四</th>
							<th>周五</th>
							<th>周六</th>
							<th>周日</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td rowSpan={2}>早</td>
							<td>素</td>
							<td>小米粥</td>
							<td>薏米包子</td>
							<td>热干面</td>
							<td>小米粥</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>小荤</td>
							<td>鸡蛋</td>
							<td>牛肉卷</td>
							<td>肉肠</td>
							<td>鲜肉小笼包</td>
							<td>鸡蛋</td>
							<td>牛肉卷</td>
							<td>肉肠</td>
						</tr>
						<tr>
							<td rowSpan={3}>中</td>
							<td>素</td>
							<td></td>
							<td></td>
							<td></td>
							<td>小米粥</td>
							<td>薏米包子</td>
							<td>热干面</td>
							<td>小米粥</td>
						</tr>
						<tr>
							<td>小荤</td>
							<td>鸡蛋</td>
							<td>牛肉卷</td>
							<td>肉肠</td>
							<td>鲜肉小笼包</td>
							<td>鸡蛋</td>
							<td>牛肉卷</td>
							<td>肉肠</td>
						</tr>
						<tr>
							<td>大荤</td>
							<td>辣子鸡</td>
							<td>牛排</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td rowSpan={2}>晚</td>
							<td>素</td>
							<td>小米粥</td>
							<td>薏米包子</td>
							<td>热干面</td>
							<td>小米粥</td>
							<td>薏米包子</td>
							<td>热干面</td>
							<td>小米粥</td>
						</tr>
						<tr>
							<td>小荤</td>
							<td>鸡蛋</td>
							<td>牛肉卷</td>
							<td>肉肠</td>
							<td>鲜肉小笼包</td>
							<td>鸡蛋</td>
							<td>牛肉卷</td>
							<td>肉肠</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default window.$app.memo(Index)
