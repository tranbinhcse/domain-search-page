
 
import NotFound from '@/pages/NotFound.vue'
import Website from '@/pages/cart/Website/Index.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Home from '@/pages/Home.vue'


import AuthRoutes from './auth'
import SupportRoutes from './support'
import ClientAreaRoutes from './clientarea' 
import CartRoutes from './cart'
import EkycRoutes from './ekyc'

export const DEFAULT_LAYOUT = () => import('@/layouts/DefaultLayout.vue');

const routes = [
   
  ...AuthRoutes,

  {
    path: '/',
    name: 'root',
    component: DEFAULT_LAYOUT,
    meta: {
      requiresAuth: false,
      roles: ['*'],
      hideInMenu: true
    },
    children: [ 
      {
          path: '',
          name: 'home',
          component: Home,
      },
        ...ClientAreaRoutes,
        ...SupportRoutes,
        ...CartRoutes,
        ...EkycRoutes,
      
        
       
        
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound,
}
 


]

export default routes