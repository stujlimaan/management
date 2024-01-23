import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

const getProducts = () => axios.get(API_BASE_URL);
const createProduct = (productData) =>
  axios.post(`${API_BASE_URL}/create`, productData);
const updateProduct = (id, product) => {
  console.log(id, product, 'product id');
  return axios.put(`${API_BASE_URL}/${id}`, product);
};
const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export { getProducts, createProduct, updateProduct, deleteProduct };
