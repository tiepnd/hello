import { createApp } from 'vue'
import App from "./App.vue"; // Import the new App.vue
import router from './router'
import './style.css'

const app = createApp(App) // Use App.vue as the root component
app.use(router)
app.mount('#app')