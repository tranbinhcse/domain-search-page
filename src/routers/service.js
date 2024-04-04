

import DomainSearch from '@/pages/domain/DomainSearch.vue'
import DomainConfig from '@/pages/cart/DomainConfig.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const ServiceRoutes = [

    {
        path: 'services',
        name: 'services',
        component: DomainSearch,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
        
    },
    {
        path: 'services/:slug',
        name: 'serviceCategory',
        component: DomainSearch,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
    }, 
    {
        path: 'services/:slug/:id',
        name: 'serviceDetails',
        component: DomainConfig,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
    },



]

export default ServiceRoutes