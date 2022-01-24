const changeTheme = ({ commit }) => {
  commit("CHANGE_THEME");
};

const initStore = ({ commit }) => {
  commit("INIT_STORE");
};

const storeBlogs = ({ commit }, payload) => {
  commit("STORE_BLOGS", payload);
};

const storeUserData = ({ commit }, payload) => {
  commit("STORE_USER_DATA", payload);
};

const logOut = ({ commit }) => {
  commit("LOGOUT_USER");
};

export default {
  storeUserData,
  logOut,
  storeBlogs,
  changeTheme,
  initStore,
};
