export default function ({ store, $cookies }) {
  store.dispatch('user/verifyAuth', $cookies)
}
