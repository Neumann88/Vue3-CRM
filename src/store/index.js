import { createStore } from "vuex";

import auth from "@/store/auth.js";
import info from "@/store/info.js";
import category from "@/store/category.js";
import record from "@/store/record.js";

export default createStore({
  state: { error: null },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error: (state) => state.error,
  },
  actions: {
    async fetchFixer() {
      const key = process.env.VUE_APP_KEY;
      const fetchApi = await fetch(
        `https://api.ratesapi.io/api/latest?base=GBP&symbols=USD,RUB,EUR`
      );
      return await fetchApi.json();
    },
  },
  modules: { auth, info, category, record },
});
