import { service } from "@/utils/core/services/axios";

export const getBlog = async (blogId) => {
  return await service.get(`/blog/${blogId}`);
};

export const getBlogs = async (query) => {
  return await service.get(`/blog${query ? "?" + query : ""}`);
};

// export const createBlog = async (token:string,data:Blog):Promise<any>=>{
//     service.defaults.headers.common['x-access-token'] = token
//     return await service.post('/blog',data);
// }
