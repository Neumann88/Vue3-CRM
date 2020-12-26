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
    async logout() {
      await firebase.auth().signOut();
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uId = await dispatch("getIdUser");
        await firebase
          .database()
          .ref(`/users/${uId}/info`)
          .set({ bill: 10000, name });
      } catch (e) {
        console.log(e);
        commit("setError", e);
        throw e;
      }
    },
    getIdUser() {
      const userId = firebase.auth().currentUser;
      return userId ? userId.uid : null;
    },
  },
};
