import firebase from "firebase/app";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getIdUser");
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({ bill: 10000, name, locale: "ru-RU" });
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    getIdUser() {
      const uid = firebase.auth().currentUser;
      return uid ? uid.uid : null;
    },
  },
};
