import mitt from 'mitt'
import { configure } from 'mobx'
import config from 'R/config'

import { getOSSClient } from '@/utils/helpers/init'
import { memo, nextTick, sleep } from '@/utils/helpers/op'

configure({ enforceActions: 'never' })

window.$app = {
	memo,
	nextTick,
	sleep,
	emitter: mitt(),
	oss: config.oss ? await getOSSClient() : null
}

export {}
