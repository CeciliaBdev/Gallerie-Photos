import { createApp } from 'vue'
import App from './App.vue'
import router from '..'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
  }

const firebaseApp = initializeApp(firebaseConfig);

const app = createApp(App)

// Pass firebaseApp as a global property to make it accessible in all components
app.config.globalProperties.$firebase = firebaseApp;

app.use(router)

app.mount('#app')
