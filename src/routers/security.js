export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');
import DomainSearch from '@/pages/domain/DomainSearch.vue'

const SecurityRoutes = [
    {
        path: 'ipaccess',
        name: 'ipaccess',  
        component: DomainSearch,
    },
]

export default SecurityRoutes