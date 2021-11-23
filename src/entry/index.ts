import store from 'store'

export const login_url = (() => {
	const role = store.get('role') || 'user'

	return `/login/${role}`
})()
