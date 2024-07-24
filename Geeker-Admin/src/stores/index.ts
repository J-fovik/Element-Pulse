import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 仓库持久化
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
