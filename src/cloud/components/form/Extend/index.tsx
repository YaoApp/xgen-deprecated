import Mustache from 'mustache'
import { Fragment, useEffect, useState } from 'react'
import { request } from 'umi'

import styles from './index.less'

interface IProps {
	link: string
	value: any
	max_height: number
	useJs?: boolean
}

const Index = (props: IProps) => {
	const { link, value, max_height, useJs } = props
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

	useEffect(() => {
		if (!html) return
		if (!useJs) return

		const script = document.createElement('script')

		script.type = 'text/javascript'
		script.src = `${link}/index.js`

		document.body.appendChild(script)
	}, [html, useJs])

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
