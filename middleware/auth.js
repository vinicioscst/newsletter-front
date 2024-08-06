export default function ({ store, route, redirect }) {
  const isAuthenticated = store.getters['user/isAuthenticated']

  if (route.path.startsWith('/admin') && !isAuthenticated) {
    redirect('/login')
  } else if (route.path === '/login' && isAuthenticated) {
    redirect('/admin')
  }
}
