import { resolve } from 'path'
import { defineConfig } from 'umi'
import WebpackPwaManifest from 'webpack-pwa-manifest'

import OfflinePlugin from '@lcdp/offline-plugin'

import config from './config'
import theme from './src/theme'

const env = process.env.NODE_ENV as 'development' | 'production'

const getLinks = () => {
	const arr = [{ rel: 'stylesheet', href: '/icon/md_icon.css' }]

	if (env === 'production' && config.pwa) arr.push({ rel: 'manifest', href: '/manifest.json' })

	return arr
}

const links = getLinks()

export default defineConfig({
	theme,
	antd: {},
	mock: {},
	mfsu: {},
	hash: true,
	cssnano: {},
	webpack5: {},
	fastRefresh: {},
	locale: { default: 'zh-CN', antd: true },
	cssModulesTypescriptLoader: {},
	dva: { immer: true, hmr: true, lazyLoad: true },
	nodeModulesTransform: { type: 'none' },
	alias: { R: resolve(__dirname, './') },
	dynamicImport: { loading: '@/components/Loader/index' },
	nprogress: { runtime: { XMLHttpRequest: false, fetch: false } },
	links,
	chainWebpack(cfg) {
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
		}
	}
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
