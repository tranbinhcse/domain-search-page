import Login from '@/pages/auth/Login.vue'
export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');

const AuthRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Login,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: Login,
  }
]

export default AuthRoutes