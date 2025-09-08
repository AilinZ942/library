import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYLZ5ePbQjoCZ5iDUxIqPFclbpAc0VPAk",
  authDomain: "week7-ailin.firebaseapp.com",
  projectId: "week7-ailin",
  storageBucket: "week7-ailin.firebasestorage.app",
  messagingSenderId: "205941027115",
  appId: "1:205941027115:web:9bdee83782b5585acb156e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const vueApp = createApp(App)
vueApp.use(router)
vueApp.use(PrimeVue, { theme: { preset: Aura } })
vueApp.mount('#app')

//app.use(PrimeVue, { theme: { preset: Aura } })
//app.use(router)

//app.mount('#app')
