

import ServiceManage from '@/pages/service/ServiceManage.vue'
import serviceDetails from '@/pages/service/ServiceDetails.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const ServiceRoutes = [

    {
        path: 'services',
        name: 'services',
        component: ServiceManage,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
        
    },
    {
        path: 'services/:slug',
        name: 'serviceCategory',
        component: ServiceManage,
        meta: {
            locale: 'menu.clientarea.domains',
            requiresAuth: true,
            roles: ['*'],
        },
    }, 
    {
        path: 'services/:slug/:id',
        name: 'serviceDetails',
        component: serviceDetails,
        meta: {
            locale: 'menu.clientarea.services',
            requiresAuth: true,
            roles: ['*'],
        },
    },



]

export default ServiceRoutes