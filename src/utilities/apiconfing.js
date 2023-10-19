const baseURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

export const login = `${baseURL}/login`;
export const signUp = `${baseURL}/register`;
export const userInfo = `${baseURL}/user-info`;
export const recipesApi = `${baseURL}/recipes`;
export const topProductsApi = `${baseURL}/topProducts`;
export const getChecklistApi = `${baseURL}/cartItems`;
export const deleteCartItem = `${baseURL}/removeCartItem`;
export const addItemToCart = `${baseURL}/cartItems`;
export const updateItemCart = `${baseURL}/cartItems`;
export const placeOrderApi = `${baseURL}/orders`;
export const topBlogsApi = `${baseURL}/topBlogs`;
export const getProductsApi = (page = 1, query) =>
  `${baseURL}/products?page=${page}${query}`;
export const getAllBlogs = (page = 1, search) =>
  `${baseURL}/blogs?page=${page}&search=${search}`;
export const getOrdersApi = (page) => `${baseURL}/orders?page=${page}`;
