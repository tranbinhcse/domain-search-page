
 
import NotFound from '@/pages/NotFound.vue'



import AuthRoutes from './auth'
import SupportRoutes from './support'
import ClientAreaRoutes from './clientarea' 
import CartRoutes from './cart'

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
        ...ClientAreaRoutes,
        ...SupportRoutes,
        ...CartRoutes,
        {
            path: '',
            name: 'home',
            component: NotFound,
        },
        
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFound,
        }
        
    ],
  },
 


]

export default routes