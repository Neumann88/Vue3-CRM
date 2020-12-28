import firebase from "firebase/app";

export default {
  actions: {
    async catroriesAddArr({ commit, dispatch }) {
      try {
        const uid = await dispatch("getIdUser");
        const categoriesArr =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once("value")
          ).val() || {};
        const newArr = [];
        Object.keys(categoriesArr).forEach((e) => {
          newArr.push({
            name: categoriesArr[e].name,
            limit: categoriesArr[e].limit,
            id: e,
          });
        });
        return newArr;
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
