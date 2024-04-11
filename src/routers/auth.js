import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
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
    component: Register,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: Login,
  }
]

export default AuthRoutes