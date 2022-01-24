import Vue from "vue";
import Vuex from "vuex";
import { storageKey } from "@/utils/core/config";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state,
  mutations,
  actions,
});

store.subscribe((_, state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
});
