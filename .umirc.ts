//@ts-nocheck

import { resolve } from 'path'
import { defineConfig } from 'umi'
import OfflinePlugin from '@lcdp/offline-plugin'
import WebpackPwaManifest from 'webpack-pwa-manifest'
import theme from './src/theme'
import config from './config'

const env: 'development' | 'production' = process.env.NODE_ENV

const getLinks = () => {
	const arr = [{ rel: 'stylesheet', href: '/icon/md_icon.css' }]

	if (env === 'production') arr.push({ rel: 'manifest', href: '/manifest.json' })

	return arr
}

const links = getLinks()

export default defineConfig({
	theme,
	title: config.name,
	antd: {},
	mock: {},
	hash: true,
	cssnano: {},
	webpack5: {},
	fastRefresh: {},
	locale: { antd: true },
	favicon: '/favicon.ico',
	cssModulesTypescriptLoader: {},
	dva: { immer: true, hmr: true },
	nodeModulesTransform: { type: 'none' },
	alias: { R: resolve(__dirname, './') },
	dynamicImport: { loading: '@/components/Loader/index' },
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
								test({ resource }) {
									return /[\\/]node_modules[\\/]/.test(resource)
								},
								priority: 10
							}
						}
					}
				}
			})

			cfg.plugin('offline-plugin').use(OfflinePlugin, [webpack_plugin_offline])
			cfg.plugin('webpack-pwa-manifest').use(WebpackPwaManifest, [webpack_plugin_pwa])
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
