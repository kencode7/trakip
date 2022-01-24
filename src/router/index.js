import Vue from "vue";
import VueRouter from "vue-router";
import publicRoutes from "./PublicRoutes";
import privateRoutes from "./PrivateRoutes";
import { store } from "@/store";
import { cannotGoToWhenLoggedIn, verifyToken } from "@/utils/core/mixin";
import NProgress from "nprogress";

const progressShowDelay = 100;
let routeResolved = false;

Vue.use(VueRouter);

const routes = [...publicRoutes, ...privateRoutes];

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0, top: 0 };
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Middlewares
router.beforeEach((to, from, next) => {
  tryInitProgress();

  const redirectToRoute = function (name) {
    if (name === from.name) {
      next();
      return;
    }
    next({ name: name });
  };

  const user = store?.state?.userData;

  if (user?.token) {
    if (!verifyToken(user?.token)) {
      store.dispatch("logOut");
      return redirectToRoute("auth");
    } else if (cannotGoToWhenLoggedIn.includes(to.path)) {
      return redirectToRoute("account");
    } else {
      return next();
    }
  }

  if (to?.meta?.auth) {
    if (user?.token) return next();
    else return redirectToRoute("auth");
  }

  next();
});

const cancelTopProgress = () => {
  routeResolved = true;
  NProgress.done();
};
const tryInitProgress = () => {
  routeResolved = false;
  setTimeout(() => {
    if (!routeResolved) {
      NProgress.start();
    }
  }, progressShowDelay);
};

router.afterEach(cancelTopProgress);

export default router;
