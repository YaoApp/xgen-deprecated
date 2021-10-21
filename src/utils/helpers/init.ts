import { getOSSToken } from '@/services/app'

export const getOSSClient = async () => {
	const data = await getOSSToken()

	return new window.OSS({
		region: 'oss-cn-hangzhou',
		accessKeyId: data.AccessKeyId,
		accessKeySecret: data.AccessKeySecret,
		stsToken: data.SecurityToken,
		refreshSTSToken: async () => {
			const info = await getOSSToken()

			return {
				accessKeyId: info.AccessKeyId,
				accessKeySecret: info.AccessKeySecret,
				stsToken: info.SecurityToken
			}
		},
		refreshSTSTokenInterval: 3000000,
		bucket: 'xae'
	})
}
