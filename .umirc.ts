import { resolve } from 'path'
import { defineConfig } from 'umi'
import WebpackPwaManifest from 'webpack-pwa-manifest'

import OfflinePlugin from '@lcdp/offline-plugin'

import config from './config'
import theme from './src/theme'

import type { BaseIConfig } from 'umi'
const env = process.env.NODE_ENV as 'development' | 'production'

const getLinks = () => {
	const arr = [{ rel: 'stylesheet', href: `${config.base}icon/md_icon.css` }]

	if (env === 'production' && config.pwa)
		arr.push({ rel: 'manifest', href: `${config.base}manifest.json` })

	return arr
}

const getScripts = () => {
	const arr = []

	if (config.oss) arr.push('https://gosspublic.alicdn.com/aliyun-oss-sdk-6.16.0.min.js')

	return arr
}

const links = getLinks()
const scripts = getScripts()

const other_config: BaseIConfig = {}

if (process.env.APP_ENV === 'development') {
	other_config['devtool'] = 'source-map'
}

export default defineConfig({
	theme,
	links,
	scripts,
	antd: {},
	mock: {},
	hash: true,
	cssnano: {},
	webpack5: {},
	fastRefresh: {},
	base: config.base,
	title: config.name,
	publicPath: config.base,
	locale: { default: 'zh-CN', antd: true },
	cssModulesTypescriptLoader: {},
	dva: { immer: true, hmr: true },
	nodeModulesTransform: { type: 'none' },
	alias: { R: resolve(__dirname, './') },
	dynamicImport: { loading: '@/components/Loader/index' },
	chainWebpack(cfg: any) {
		cfg.resolve.alias.set('moment$', resolve(__dirname, 'node_modules/moment/moment.js'))
		cfg.module.rule('mjs-rule').test(/.m?js/).resolve.set('fullySpecified', false)

		if (env === 'production') {
			cfg.merge({
				optimization: {
					splitChunks: {
						chunks: 'all',
						minSize: 30000,
						minChunks: 3,
						automaticNameDelimiter: '.',
						cacheGroups: {
							vendor: {
								name: 'vendors',
								test({ resource }: any) {
									return /[\\/]node_modules[\\/]/.test(resource)
								},
								priority: 10
							}
						}
					}
				}
			})

			if (config.pwa) {
				cfg.plugin('offline-plugin').use(OfflinePlugin, [webpack_plugin_offline])
				cfg.plugin('webpack-pwa-manifest').use(WebpackPwaManifest, [
					webpack_plugin_pwa
				])
			}
		}
	},
	proxy: {
		'/api': {
			target: 'http://local.iqka.com:5099',
			changeOrigin: true
		},
		'/extend': {
			target: 'http://local.iqka.com:5099',
			changeOrigin: true
		}
	},
	...other_config
})

const webpack_plugin_offline: any = {
	updateStrategy: 'changed',
	autoUpdate: 1000 * 60 * 2,
	safeToUseOptionalCaches: true,
	AppCache: { events: true },
	ServiceWorker: { events: true, navigateFallbackURL: '/' }
}

const webpack_plugin_pwa: any = {
	name: config.name,
	short_name: config.short_name,
	fingerprints: false,
	description: config.description,
	background_color: '#232326',
	theme_color: '#40b983',
	crossorigin: 'use-credentials',
	display: 'standalone',
	icons: [
		{
			src: resolve('public/logo.png'),
			sizes: [96, 128, 192, 256, 384, 512]
		}
	]
}
