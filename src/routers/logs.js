export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');
import DomainSearch from '@/pages/domain/DomainSearch.vue'

const LogsRoutes = [
    {
        path: 'history',
        name: 'history',  
        component: DomainSearch,
    },
    {
        path: 'emails',
        name: 'emails',  
        component: DomainSearch,
    },
    {
        path: 'creditlogs',
        name: 'creditlogs',  
        component: DomainSearch,
    },  
    {
        path: 'notifications',
        name: 'notifications',  
        component: DomainSearch,
    },
]

export default LogsRoutes