import store from 'store'

export const login_url = (() => {
	return store.get('login_url') || '/login/user'
})()
