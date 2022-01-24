import { store } from "@/store";

export default {
  async mounted() {
    store.dispatch("initStore");
  },
};
