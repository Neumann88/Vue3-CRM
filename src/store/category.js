import firebase from "firebase/app";

export default {
  actions: {
    async categoriesAddArr({ commit, dispatch }) {
      try {
        const uid = await dispatch("getIdUser");
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};
        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async categoriesAddId({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getIdUser");
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...category, id };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async updateCategories({ commit, dispatch }, { name, limit, id }) {
      try {
        const uid = await dispatch("getIdUser");
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ name, limit });
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { name, limit }) {
      try {
        const uid = await dispatch("getIdUser");
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ name, limit });
        return { name, limit, id: category.key };
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
  },
};
