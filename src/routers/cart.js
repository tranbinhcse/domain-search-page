
import DomainSearch from '@/pages/domain/DomainSearch.vue'
import DomainConfig from '@/pages/cart/DomainConfig.vue'
import Checkout from '@/pages/cart/Checkout.vue'
import ServiceOrder from '@/pages/cart/ServiceOrder.vue'
import Website from '@/pages/cart/Website/Index.vue'
import WebsiteDomain from '@/pages/cart/Website/Domain.vue'

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
                path: 'website',
                name: 'CreateWebsite',
                component: Website,
                meta: {
                    locale: 'menu.cart.website',
                    requiresAuth: true,
                    roles: ['*'],
                },
            },

            {
                path: 'website/domain',
                name: 'DomainWebsite',
                component: WebsiteDomain,
                meta: {
                    locale: 'menu.cart.website',
                    requiresAuth: true,
                    roles: ['*'],
                },
            },


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
                path: 'shopping-cart',
                name: 'shopping-cart',
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
                component: Checkout,
            },
        ],
      },

]

export default CartRoutes