import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/categories`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getCategories;
