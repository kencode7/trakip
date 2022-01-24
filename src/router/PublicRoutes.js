import { blog } from "./routes/blog";

export default [
  {
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: 'home', webpackPrefetch: true */ "@/views/Public/Home/index.vue"
      ),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(
        /* webpackChunkName: 'about', webpackPrefetch: true */ "@/views/Public/About/index.vue"
      ),
  },
  ...blog,
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () =>
      import(
        /* webpackChunkName: '404', webpackPrefetch: true */ "@/views/Public/404/index.vue"
      ),
  },
];
