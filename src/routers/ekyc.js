

import Ekyc from '@/pages/ekyc/Index.vue' 

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const EkycRoutes = [

    {
        path: 'ekyc',
        name: 'ekyc',
        component: Ekyc,
        meta: {
            locale: 'menu.clientarea.ekyc',
            requiresAuth: true,
            roles: ['*'],
        },   
    }, 

]

export default EkycRoutes