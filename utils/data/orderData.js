import { clientCredentials } from '../client';
import convertKeysToCamelCase from '../convertToCamelCase';

const dbUrl = clientCredentials.databaseURL;

const getOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders?customer=${customerId}`).then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch((error) => reject(error));
});

const getOrdersByStore = (storeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders?store=${storeId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch((error) => reject(error));
});

// ProductOrder calls, to get the quantity of the product in each order

const getProductOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/product_orders?order=${orderId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch((error) => reject(error));
});

const getProductOrderByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/product_orders?customer=${customerId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve((data));
    })
    .catch(reject);
});

export {
  getOrdersByCustomer, getOrdersByStore, getProductOrder, getProductOrderByCustomer,
};
