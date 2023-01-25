import { clientCredentials } from '../client';
import convertKeysToCamelCase from '../convertToCamelCase';

const dbUrl = clientCredentials.databaseURL;

const getCustomersPaymentMethods = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/payment_methods?customer=${customerId}`).then((response) => response.json())
    .then((data) => {
      resolve(data);
    }).catch(reject);
});

const updatePaymentMethod = (paymentMethodId, paymentMethod) => new Promise((resolve, reject) => {
  const paymentObj = {
    label: paymentMethod.label,
    card_number: paymentMethod.cardNumber,
    expiration_date: paymentMethod.expirationDate,
  };
  fetch(`${dbUrl}/payment_methods/${paymentMethodId}`, {
    method: 'PUT',
    body: JSON.stringify(paymentObj),
    headers: { 'content-type': 'application/json' },
  }).then((response) => resolve(response))
    .catch((error) => reject(error));
});

const getSinglePaymentMethod = (paymentMethodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/payment_methods/${paymentMethodId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(convertKeysToCamelCase(data));
    })
    .catch(reject);
});

const createPaymentMethod = (paymentMethod) => new Promise((resolve, reject) => {
  const paymentObj = {
    customer: paymentMethod.customer,
    label: paymentMethod.label,
    card_number: paymentMethod.cardNumber,
    expiration_date: paymentMethod.expirationDate,
  };
  fetch(`${dbUrl}/payment_methods`, {
    method: 'POST',
    body: JSON.stringify(paymentObj),
    headers: { 'content-type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((err) => reject(err));
});

const deletePaymentMethod = (paymentMethodId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/payment_methods/${paymentMethodId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  updatePaymentMethod, getCustomersPaymentMethods, createPaymentMethod, deletePaymentMethod, getSinglePaymentMethod,
};
