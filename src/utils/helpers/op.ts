import Equal from 'fast-deep-equal'
import { memo as react_memo } from 'react'

import type { Memo } from '@/typings/app'

export const memo: Memo = (el) => {
	return react_memo(el, (prev, next) => Equal(prev, next))
}

export const nextTick = async () => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), 0)
	})
}

export const sleep = async (time: number) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), time)
	})
}
