import { clientCredentials } from '../client';
import convertKeysToCamelCase from '../convertToCamelCase';

const dbUrl = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${productId}`).then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    }).catch(reject);
});

const updateProduct = (product, productId) => new Promise((resolve, reject) => {
  const productObj = {
    title: product.title,
    description: product.description,
    store: product.store,
    price: product.price,
    product_type: product.productType,
    inventory: product.inventory,
    image: product.image,
  };
  fetch(`${dbUrl}/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(productObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

const createProduct = (product) => new Promise((resolve, reject) => {
  const productObj = {
    title: product.title,
    description: product.description,
    store: product.store,
    price: product.price,
    product_type: product.productType,
    inventory: product.inventory,
    image: product.image,
  };
  fetch(`${dbUrl}/products`, {
    method: 'POST',
    body: JSON.stringify(productObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

const getProductsByCategory = (categoryId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products?category=${categoryId}`)
    .then((response) => response.json())
    .then((data) => resolve(convertKeysToCamelCase(data)))
    .catch(reject);
});

const getProductsByStore = (storeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products?store=${storeId}`)
    .then((response) => response.json())
    .then((data) => resolve(convertKeysToCamelCase(data)))
    .catch(reject);
});

export {
  getProducts, getSingleProduct, updateProduct, createProduct, getProductsByCategory, getProductsByStore,
};
