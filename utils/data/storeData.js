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

export { getStores, getSingleStore, getStoreBySeller };
