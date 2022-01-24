export const blog = [
  {
    path: "/blog",
    name: "blog",
    component: () =>
      import(/* webpackChunkName: 'blog'*/ "@/views/Public/Blog/index.vue"),
  },
  {
    path: "/blog/:blog_id",
    name: "view_blog",
    component: () =>
      import(/* webpackChunkName: 'blog'*/ "@/views/Public/ViewBlog/index.vue"),
  },
];
