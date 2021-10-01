import { message } from 'antd'

export const install = async () => {
	const runtime = await import('@lcdp/offline-plugin/runtime')

	let closer_message_updating: any
	let closer_message_ready: any

	runtime.install({
		onUpdating: () => {
			closer_message_updating = message.loading('应用更新中，请勿进行操作')
		},
		onUpdateReady: () => {
			closer_message_updating()

			closer_message_ready =
				message.loading('正在安装更新内容，安装完成之后页面将会自动刷新')

			runtime.applyUpdate()
		},
		onUpdated: () => {
			closer_message_ready()

			window.location.reload()
		},
		onUpdateFailed: () => {
			message.error('应用更新失败，请联系开发者查找原因')
		}
	})
}
