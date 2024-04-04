
import DomainSearch from '@/pages/domain/DomainSearch.vue'
import DomainConfig from '@/pages/cart/DomainConfig.vue'
import ServiceOrder from '@/pages/cart/ServiceOrder.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');

const CartRoutes = [


    {
        path: '/cart',
        name: 'cart', 
        meta: {
          locale: 'menu.cart',
          requiresAuth: true,
          icon: 'icon-dashboard',
          order: 0,
        },
        children: [
            {
                path: 'domain-search',
                name: 'DomainSearch',
                component: DomainSearch,
                meta: {
                    locale: 'menu.dashboard.workplace',
                    requiresAuth: true,
                    roles: ['*'],
                },
            },
           
            {
                path: 'config-domain',
                name: 'DomainConfig',
                component: DomainConfig,
                meta: {
                    locale: 'menu.domains',
                    requiresAuth: false,
                    roles: ['*'],
                },
            }, 

            {
                path: ':slug',
                name: 'serviceOrder',
                component: ServiceOrder,
            },

            {
                path: 'checkout',
                name: 'checkout',
                component: DomainConfig,
            },
        ],
      },

]

export default CartRoutes