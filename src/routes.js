import DomainSearch from './pages/domain/DomainSearch.vue'
import DomainConfig from './pages/cart/DomainConfig.vue'
import Login from './pages/auth/Login.vue'
import AddToCart from '@/components/AddToCart.vue'
import Ekyc from '@/components/ekyc/Ekyc.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      breadcrumb: ['Đăng nhập']
    }
  },
  {
    path: '/',
    name: 'home',
    component: DomainSearch
  },
  {
    path: '/config-domain',
    name: 'DomainConfig',
    component: DomainConfig,
   
  },

  {
    path: '/addcart',
    name: 'AddToCart',
    component: AddToCart
  },
  {
    path: '/ekyc',
    name: 'Ekyc',
    component: Ekyc
  }



]

export default routes