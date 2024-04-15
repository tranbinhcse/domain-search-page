

import userDetails from '@/pages/clientarea/details.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const BillingRoutes = [

    {
        path: 'details',
        name: 'details',
        component: userDetails,
        meta: {
            locale: 'menu.clientarea.details',
            requiresAuth: true,
            roles: ['*'],
        },
        
    },
     



]

export default BillingRoutes