export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue')
import NotFound from '@/pages/NotFound.vue'

const SupportRoutes = [
  {
    path: '',
    name: 'support',
    meta: {
      locale: 'menu.support',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0
    },
    children: [
      {
        path: 'tickets',
        name: 'tickets',
        component: NotFound
      },
      {
        path: 'new',
        name: 'newTicket',
        component: NotFound
      },
      {
        path: 'view/:num',
        name: 'viewTicket',
        component: NotFound
      }
    ]
  }
]

export default SupportRoutes
