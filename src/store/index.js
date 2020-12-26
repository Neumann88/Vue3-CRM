import { createStore } from "vuex";
import auth from "@/store/auth.js";

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
  actions: {},
  modules: { auth },
});
