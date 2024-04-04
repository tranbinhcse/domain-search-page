

import DomainSearch from '@/pages/domain/DomainSearch.vue'
import DomainConfig from '@/pages/cart/DomainConfig.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const BillingRoutes = [

    {
        path: 'invoices',
        name: 'invoices',
        component: DomainConfig,
        meta: {
            locale: 'menu.clientarea.invoices',
            requiresAuth: true,
            roles: ['*'],
        },
        
    },
    {
        path: 'invoices/:id',
        name: 'invoiceDetails',
        component: DomainSearch,
        meta: {
            locale: 'menu.clientarea.invoices',
            requiresAuth: true,
            roles: ['*'],
        },
    }, 
     



]

export default BillingRoutes