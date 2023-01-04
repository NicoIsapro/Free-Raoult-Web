import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import DataView from 'primevue/dataview';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Chips from 'primevue/chips';
import Message from 'primevue/message';
import ToastService from 'primevue/toastservice';
import Tag from 'primevue/tag';
import Panel from 'primevue/panel';
import VueCookies from 'vue-cookies';

import './assets/main.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/md-dark-indigo/theme.css'

const app = createApp(App)
app.component('DataView', DataView)
app.component('Dropdown', Dropdown)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('InputText', InputText)
app.component('Chips', Chips)
app.component('Message', Message)
app.component('Tag', Tag)
app.component('Panel', Panel)

app.use(PrimeVue)
app.use(router)
app.use(ToastService)
app.use(VueCookies);

app.mount('#app')
