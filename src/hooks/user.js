import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';

import { useUserStore } from '@/stores';
import { useAuthStore } from '@/stores';

export default function useUser() {
  const router = useRouter();
  const userStore = useUserStore();
  const authStore = useAuthStore();

  const logout = async (logoutTo) => {
    await authStore.logout();
    const currentRoute = router.currentRoute.value;
    Message.success('登出成功');
    router.push({
      name: logoutTo && typeof logoutTo === 'string' ? logoutTo : 'login',
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name,
      },
    });
  };

  return {
    logout,
  };
}
