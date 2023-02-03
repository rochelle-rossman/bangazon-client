import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getStores = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stores`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleStore = (storeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stores/${storeId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        name: data.name,
        seller: data.seller,
      });
    }).catch(reject);
});

const getStoreBySeller = (sellerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/stores?seller=${sellerId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

const createStore = (storeObj) => new Promise((resolve, reject) => {
  const store = {
    seller: storeObj.seller,
    name: storeObj.name,
  };
  fetch(`${dbUrl}/stores`, {
    method: 'POST',
    body: JSON.stringify(store),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateStore = (storeObj, storeId) => new Promise((resolve, reject) => {
  const store = {
    name: storeObj.name,
  };
  fetch(`${dbUrl}/stores/${storeId}`, {
    method: 'PUT',
    body: JSON.stringify(store),
    headers: { 'content-type': 'application/json' },
  }).then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getStores, getSingleStore, getStoreBySeller, createStore, updateStore,
};
