import { createApp } from 'vue'
import './style.css'
import 'virtual:windi.css'
import App from './App.vue'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app=createApp(App)
import DataVVue3 from '@kjgl77/datav-vue3'
import myutils from './utils/index';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import EChart from "vue-echarts";
app.component("v-chart", EChart);
app.use(DataVVue3)
app.use(myutils)
app.use(store)
import 'quasar/dist/quasar.css'
import router from './router'
app.use(router)
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import TuiPlus from '@wocwin/t-ui-plus'
import '@wocwin/t-ui-plus/lib/style.css'
// Import Quasar css
app.use(TuiPlus)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })


app.use(ElementPlus)
app.mount('#app')
