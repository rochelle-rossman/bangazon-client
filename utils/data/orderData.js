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

const getOpenOrdersByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders?customer=${customerId}&status=in-progress`)
    .then((response) => response.json())
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

const createOrder = (order, userId) => new Promise((resolve, reject) => {
  const orderObj = {
    store: order.store,
    customer: userId,
    payment_method: order.paymentMethod,
    products: order.products,
  };
  fetch(`${dbUrl}/orders`, {
    method: 'POST',
    body: JSON.stringify(orderObj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const updateOrder = (orderId, order) => new Promise((resolve, reject) => {
  const orderObj = {
    status: order.status,
    // payment_method: order.paymentMethod,
    products: order.products,
  };
  fetch(`${dbUrl}/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify(orderObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

const deleteOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/orders/${orderId}`, {
    method: 'DELETE',
  }).then(resolve)
    .catch(reject);
});

export {
  getOrdersByCustomer, getOrdersByStore, getProductOrder, getProductOrderByCustomer, createOrder, deleteOrder, updateOrder, getOpenOrdersByCustomer,
};
