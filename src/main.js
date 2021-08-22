import { createApp } from 'vue'
// import Vue  from 'vue' // Vue2会全量引用Vue实例，Vue3.0则按需使用，可以作treeshaking
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
