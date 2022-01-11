import Mustache from 'mustache'
import { Fragment, useEffect, useState } from 'react'
import { request } from 'umi'

import styles from './index.less'

interface IProps {
	link: string
	value: any
	max_height: number
}

const Index = (props: IProps) => {
	const { link, value, max_height } = props
	const [css, setCss] = useState('')
	const [html, setHtml] = useState('')

	const getCss = async () => {
		const css = await request(`${link}/index.css`)

		setCss(css)
	}

	const getHTML = async () => {
		const html = await request(`${link}/index.html`)

		setHtml(html)
	}

	useEffect(() => {
		getCss()
		getHTML()
	}, [props])

	console.log(props)

	return (
		<Fragment>
			<style>{css}</style>
			<div
				className={styles._local}
				dangerouslySetInnerHTML={{ __html: Mustache.render(html, value) }}
				style={{ maxHeight: max_height }}
			></div>
		</Fragment>
	)
}

export default window.$app.memo(Index)
