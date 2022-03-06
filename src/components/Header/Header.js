import { changeTheme } from "@/utils/core/mixin";
import { store } from "@/store";
export default {
  data() {
    return {
      active: "home",
      activeSidebar: false,
      themeSwitch: store.state.darkTheme,
    };
  },
  methods: {
    changeTheme(val) {
      store.dispatch("changeTheme");
      changeTheme(val);
    },
  },
};