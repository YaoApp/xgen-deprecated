import { Image } from 'antd'

import { getImageSrc } from '@/utils/helpers/filters'

import styles from './index.less'

import type { ImageProps } from 'antd'

interface IProps extends ImageProps {
	value: string | Array<string>
}

const Index = (props: IProps) => {
	const { value } = props

	const props_image: ImageProps = {
		...props,
		preview: false
	}

	return (
		<div className={styles._local}>
			{Array.isArray(value) && value.length ? (
				value.map((item: string, index: number) => (
					<Image {...props_image} src={getImageSrc(item)} key={index}></Image>
				))
			) : (
				<Image {...props_image} src={getImageSrc(String(value))}></Image>
			)}
		</div>
	)
}

export default window.$app.memo(Index)
