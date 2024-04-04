

import DomainSearch from '@/pages/domain/DomainSearch.vue'
import DomainConfig from '@/pages/cart/DomainConfig.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const DomainRoutes = [

    {
        path: 'domains',
        name: 'domains',
        component: DomainSearch,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
        
    },
    {
        path: 'domains/:id/:domain?',
        name: 'domainDetails',
        component: DomainConfig,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
    },


]

export default DomainRoutes