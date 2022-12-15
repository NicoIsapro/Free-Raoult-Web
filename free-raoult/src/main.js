import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

import './assets/main.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/mdc-dark-deeppurple/theme.css'
const app = createApp(App)
app.component('DataView', DataView)
app.component('Dropdown', Dropdown)
app.component('Button', Button)

app.use(PrimeVue)
app.use(router)

app.mount('#app')
