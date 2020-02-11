import loadable from '@loadable/component'

const Home = loadable(() => import('../pages/Home'))

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    strict: true,
    name: 'home'
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    strict: true,
    name: 'home'
  },
]