import HelloWorldVue from './components/HelloWorld.vue'
import Dashboard from './pages/Dashboard.vue'
import CloudHosting from './pages/CloudHosting.vue'
import DomainManage from './pages/domain/DomainManage.vue'
import DomainSearch from './pages/domain/DomainSearch.vue'
import DomainRegister from './pages/domain/DomainRegister.vue'
import ClientArea from './pages/ClientArea.vue'
import Login from './pages/auth/Login.vue'
import AccountDetail from './pages/AccountDetail.vue'
import DomainDetail from './pages/domain/DomainDetail.vue'
import ServiceOrder from './pages/service/ServiceOrder.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DomainSearch,
   
  },

]

export default routes