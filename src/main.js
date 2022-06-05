import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css"
import router from './router/index'
import store from "./store";
let app = createApp(App);

app.use(router)
app.use(store);
// .use(store)
app.mount('#app')
import "bootstrap/dist/js/bootstrap.js"
