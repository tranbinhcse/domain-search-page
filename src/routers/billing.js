

import invoiceDetails from '@/pages/billing/InvoiceDetails.vue'
// import DomainSearch from '@/pages/domain/DomainSearch.vue'
import Invoices from '@/pages/billing/Invoices.vue'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');


const BillingRoutes = [

    {
        path: 'invoices',
        name: 'invoices',
        component: Invoices,
        meta: {
            locale: 'menu.clientarea.invoices',
            requiresAuth: true,
            roles: ['*'],
        },
        
    },
    {
        path: 'invoices/:id',
        name: 'invoiceDetails',
        component: invoiceDetails,
        meta: {
            locale: 'menu.clientarea.invoices',
            requiresAuth: true,
            roles: ['*'],
        },
    }, 
     



]

export default BillingRoutes