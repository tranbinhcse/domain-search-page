import DomainDetail from '@/pages/domain/DomainDetail.vue'
import DomainManage from '@/pages/domain/DomainManage.vue'
import DomainDNS from '@/pages/domain/DomainDNS.vue'
export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue')
const DomainRoutes = [
  {
    path: 'domains',
    name: 'domains',
    component: DomainManage,
    meta: {
      locale: 'menu.clientarea.domains',
      requiresAuth: true,
      roles: ['*']
    }
  },
  {
    path: 'domains/:id/:domain?',
    name: 'domainDetails',
    component: DomainDetail,
    meta: {
      locale: 'menu.clientarea.domains',
      requiresAuth: true,
      roles: ['*']
    }
  },
  {
    path: 'domains/:id/:domain?/dns',
    name: 'domainDNS',
    component: DomainDNS,
    meta: {
      locale: 'menu.clientarea.domains',
      requiresAuth: true,
      roles: ['*']
    }
  }
]

export default DomainRoutes
