import { store } from "./index";
import { version } from "../../package.json";
import { storageKey } from "@/utils/core/config";
import { changeTheme } from "@/utils/core/mixin";

const CHANGE_THEME = (state) => {
  state.darkTheme = !state.darkTheme;
  changeTheme(state.darkTheme);
};

const INIT_STORE = (state) => {
  const lState = localStorage.getItem(storageKey);

  if (lState) {
    // load the cached state if versions match
    const cachedState = JSON.parse(lState);

    //remember user current theme
    changeTheme(cachedState.darkTheme);

    if (cachedState.version == version) {
      store.replaceState(
        //replace app's store state with the cached version
        Object.assign(store.state, cachedState)
      );
    } else {
      //update store version to current version
      state.version = version;
    }
  } else {
    //update store version to current version
    state.version = version;
  }
};
const STORE_BLOGS = (state, payload) => {
  state.blogs = payload;
};

const STORE_USER_DATA = (state, payload) => {
  state.userData = payload;
};

const LOGOUT_USER = (state) => {
  state.userData = {};
};

export default {
  STORE_USER_DATA,
  LOGOUT_USER,
  STORE_BLOGS,
  CHANGE_THEME,
  INIT_STORE,
};
