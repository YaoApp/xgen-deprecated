/** 图标组件，支持如下两种图标库：
 * feather icon https://feathericons.com/
 * material design icon https://fonts.google.com/icons
 */

import clsx from 'clsx'
import { useMemo } from 'react'

interface IProps {
	/** 图表样式类 */
	className?: string
	/** 图标名称，以`icon`开头为feather icon，以`outline/filled`结尾为material design icon */
	name: string
	/** 图标尺寸，单位px */
	size?: number
	/** 图标颜色，适用所有字体颜色 */
	color?: string
	/** 点击事件 */
	onClick?: () => void
}

const Index = (props: IProps) => {
	const { className = '', name = '', size = '24', color = '#a2a5b9', onClick } = props

	if (!name) return null

	const style: React.CSSProperties = useMemo(() => {
		return {
			fontSize: size + 'px',
			color
		}
	}, [size, color])

	const md = useMemo(() => {
		if (!name) return {}

		const arr = name.split('-')
		const type = arr.pop()

		return {
			type,
			name: arr.join('_')
		}
	}, [name])

	if (name.indexOf('icon-') !== -1) {
		return <i className={clsx([name, className])} style={style} onClick={onClick}></i>
	}

	return (
		<i className={clsx(['Icon', md.type, className])} style={style} onClick={onClick}>
			{md.name}
		</i>
	)
}

export default window.$app.memo(Index)
