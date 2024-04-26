import WebsiteDetails from '@/pages/service/WebsiteDetails.vue'
import WebsiteManage from '@/pages/service/WebsiteManage.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue')

const WebsiteRoutes = [
  {
    path: 'website',
    name: 'WebsiteManage',
    component: WebsiteManage,
    meta: {
      locale: 'menu.clientarea.website',
      requiresAuth: true,
      roles: ['*']
    }
  },

  {
    path: 'website/:id',
    name: 'WebsiteDetails',
    component: WebsiteDetails,
    meta: {
      locale: 'menu.clientarea.website',
      requiresAuth: true,
      roles: ['*']
    }
  }
]

export default WebsiteRoutes
