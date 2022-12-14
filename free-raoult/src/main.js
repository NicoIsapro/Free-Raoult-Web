import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import DataView from 'primevue/dataview';

import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue)
app.component('DataView', DataView)
app.use(router)

app.mount('#app')
