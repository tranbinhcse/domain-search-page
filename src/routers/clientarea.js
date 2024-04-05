
// import DomainSearch from '@/pages/domain/DomainSearch.vue'
// import DomainConfig from '@/pages/cart/DomainConfig.vue'
import Dashboard from '@/pages/Dashboard.vue'

import BillingRoutes from './billing'
import ServiceRoutes from './service'
import WebsiteRoutes from './website'
import DomainRoutes from './domain'
import SecurityRoutes from './security'
import LogsRoutes from './logs'


export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');

const ClientAreaRoutes = [

    {
        path: '/clientarea',
        name: 'clientarea',
        meta: {
          locale: 'menu.clientarea',
          requiresAuth: true,
          icon: 'icon-dashboard',
          order: 0,
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
                meta: {
                  locale: 'menu.clientarea.dashboard',
                  requiresAuth: true,
                  icon: 'icon-dashboard',
                  order: 1,
                },
              },
            ...BillingRoutes,
            ...ServiceRoutes,
            ...WebsiteRoutes,
            ...DomainRoutes,
            ...SecurityRoutes,
            ...LogsRoutes,
        ],
      },


]

export default ClientAreaRoutes