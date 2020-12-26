import { createApp } from "vue";
import "./registerServiceWorker";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import messagePlugin from "@/utils/messagesPlugin.js";

import "materialize-css/dist/js/materialize.min.js";

firebase.initializeApp({
  apiKey: "AIzaSyAs2KKCA8ps09WVxCZ3dQZtBSXFHct9oOw",
  authDomain: "vue-crm-training-2c369.firebaseapp.com",
  projectId: "vue-crm-training-2c369",
  storageBucket: "vue-crm-training-2c369.appspot.com",
  messagingSenderId: "266812859291",
  appId: "1:266812859291:web:944dc66d719d21b848373e",
  measurementId: "G-D6G0KCJBQ8",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .mount("#app");
  }
});
