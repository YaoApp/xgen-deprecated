import mitt from 'mitt'
import config from 'R/config'

import { getOSSClient } from '@/utils/helpers/init'
import { memo, nextTick, sleep } from '@/utils/helpers/op'

window.$app = {
	memo,
	nextTick,
	sleep,
	emitter: mitt(),
	oss: config.oss ? await getOSSClient() : null
}

export {}
