import type { Model } from '@/typings/dva'

const pageModel: Model = {
	namespace: 'common',

	state: {},

	reducers: {
		updateState(state, { payload }: any) {
			return {
				...state,
				...payload
			}
		}
	}
}

export default pageModel
