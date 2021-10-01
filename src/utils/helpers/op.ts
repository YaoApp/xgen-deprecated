import { memo as react_memo } from 'react'
import Equal from 'fast-deep-equal'
import type { Memo } from '@/typings/app'

export const memo: Memo = (el) => {
	return react_memo(el, (prev, next) => Equal(prev, next))
}
