import axios from "axios";
import jwtDecode from "jwt-decode";

const config = {
  headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
  },
}

const decodeJwt = () => {
  const token = localStorage.getItem("Authentication");
    if (token) {    
      try {
        const decoded = jwtDecode(token)
        const id = decoded._id;
        const role = decoded.role;
        return {id, role}
      } catch (err) {
        console.log(err)
      }
    } else {
      return null
    }
}

const signIn = async (data) => {
  return axios.post("http://localhost:8081/login", data)
  .then((response) => { 
      localStorage.setItem('Authentication', JSON.stringify(response.data.data));
      axios.defaults.headers.common['Authorization'] = response.data.data;
  })
  .catch(err => {
      console.log(err)
  })
}

const viewProfile = async (id) => {
  return await axios.get(`http://localhost:8081/view-profile/${id}`)
}

const searchProduct = async (id) => {
  return await axios.get(`http://localhost:8081/products/${id}`)
}

const getProducts = async () => {
  return await axios.get("http://localhost:8081/products")
}

const createNewProduct = async (data) => {
  return await axios.post("http://localhost:8081/products/addproduct", data, config)
}

const updateProduct = async (id, data) => {
  return await axios.patch(`http://localhost:8081/products/${id}`, data, config)
}

const deleteProduct = async (id) => {
  return await axios.delete(`http://localhost:8081/products/${id}`, config)
}

const getUsers = async () => {
  return await axios.get("http://localhost:8081/user-list", config)
}

const createNewUser = async (data) => {
  return await axios.post("http://localhost:8081/register", data)
}

const updateUser = async (id, data) => {
  return await axios.patch(`http://localhost:8081/user-list/${id}`, data, config)
}

const deleteUser = async (id) => {
  return await axios.delete(`http://localhost:8081/user-list/${id}`, config)
}

const getCategories = async () => {
  return await axios.get("http://localhost:8081/categories", config)
}

const createNewCategory = async (data) => {
  return await axios.post("http://localhost:8081/categories/addcategory", data, config)
}

const updateCategory = async (id, data) => {
  return await axios.patch(`http://localhost:8081/categories/${id}`, data, config)
}

const deleteCategory = async (id) => {
  return await axios.delete(`http://localhost:8081/categories/${id}`, config)
}

const getProductsByCategoryID = async (id) => {
  return await axios.get(`http://localhost:8081/products/get-products-category/${id}`, config)
}

const viewCart = async () => {
  return await axios.get(`http://localhost:8081/view-cart/${decodeJwt().id}`, config)
}

const addToCart = async (id, quantity) => {
  const data = {
    user: decodeJwt().id,
    product: id,
    quantity: quantity
  }
  console.log(data)
  return await axios.post("http://localhost:8081/add-to-cart", data, config)
}

const deleteProductFromCart = async (id) => {
  const data = {
    user: decodeJwt().id,
    product: id
  }
  return await axios.delete("http://localhost:8081/delete-from-cart", {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
  }, data})
}

const deleteCart = async (id) => {
  return await axios.delete(`http://localhost:8081/delete-cart/${id}`, config)
}

const createOrder = async (data) => {
  const body = {
    user: data.user,
    orderDetail: data.orderDetail,
    status: data.status,
    subTotal: data.subTotal,
    address: data.address,
    note: data.note
  }
  console.log(data)
  return await axios.post("http://localhost:8081/create-order", body, config)
}

const viewOrders = async () => {
  return await axios.get("http://localhost:8081/orders", {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
  }})
}

const getOrders = async () => {
  return await axios.get("http://localhost:8081/view-orders", config)
}

const deleteOrder = async (id) => {
  return await axios.delete(`http://localhost:8081/delete-order/${id}`)
}

const updateOrder = async (id, data) => {
  return await axios.patch(`http://localhost:8081/update-order/${id}`, data, config)
}

const searchProducts = async (search) => {
  const data = {search: search}
  return await axios.get(`http://localhost:8081/search-products?${new URLSearchParams(data).toString()}`)
}

const addToWishLish = async (id, isLiked) => {
  const data = {
    user: decodeJwt().id,
    product: id,
    isLiked: isLiked
  }
  console.log(data)
  return await axios.post("http://localhost:8081/add-to-wish-list", data, config)
}

const viewWishList = async () => {
  return await axios.get("http://localhost:8081/view-wish-list", {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
  }})
}

const deleteProductFromWishList = async (id) => {
  const data = {
    product: id
  }
  console.log(data)
  return await axios.delete("http://localhost:8081/delete-from-wish-list", {headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
  }, data})
}

const createComment = async (id, comment, rating) => {
  const data = {
    product: id,
    user: decodeJwt().id,
    comment: comment,
    rating: rating
  }
  console.log(data)
  return await axios.post("http://localhost:8081/create-comment", data, config)
}


export {
  decodeJwt,
  signIn,
  viewProfile,
  getProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategoryID,
  viewCart,
  addToCart,
  deleteProductFromCart,
  deleteCart,
  createOrder,
  viewOrders,
  getOrders,
  deleteOrder, 
  updateOrder,
  searchProducts,
  addToWishLish,
  viewWishList,
  deleteProductFromWishList,
  createComment
}