import { Table } from 'antd'
import clsx from 'clsx'
import Slider from 'react-slick'

import styles from './index.less'

interface IProps {
	height: number
	columns: Array<any>
	data: Array<any>
	forChart?: boolean
	autoplay?: boolean
	speed?: number
}

const Index = (props: IProps) => {
	return (
		<div
			className={clsx([styles._local, props.forChart ? styles.forChart : ''])}
			style={{ height: props.height || 300, overflow: 'scroll' }}
		>
			{props.autoplay ? (
				<Slider
					vertical
					infinite
					autoplay
					cssEase='linear'
					dots={false}
					arrows={false}
					autoplaySpeed={props?.speed || 6000}
					speed={props?.speed || 6000}
					pauseOnHover
					pauseOnFocus
				>
					{[0, 1].map((_, index) => (
						<Table
							columns={props.columns}
							dataSource={props.data}
							rowKey={(item) => item.id}
							showHeader={false}
							pagination={false}
							key={index}
						></Table>
					))}
				</Slider>
			) : (
				<Table
					columns={props.columns}
					dataSource={props.data}
					rowKey={(item) => item.id}
					pagination={false}
					sticky={{ offsetHeader: 16 }}
				></Table>
			)}
		</div>
	)
}

export default window.$app.memo(Index)
