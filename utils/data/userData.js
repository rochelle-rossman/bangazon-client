import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getSingleUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`).then((response) => response.json())
    .then((userObj) => {
      resolve({
        id: userObj.id,
        uid: userObj.uid,
        firstName: userObj.first_name,
        lastName: userObj.last_name,
        email: userObj.email,
        streetAddress: userObj.street_address,
        city: userObj.city,
        state: userObj.state,
        zipcode: userObj.zipcode,
      });
    }).catch(reject);
});

const updateUser = (userId, userObj) => new Promise((resolve, reject) => {
  const updatedUserObj = {
    first_name: userObj.firstName,
    last_name: userObj.lastName,
    email: userObj.email,
    street_address: userObj.streetAddress,
    city: userObj.city,
    state: userObj.state,
    zipcode: userObj.zipcode,
  };
  fetch(`${dbUrl}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updatedUserObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resolve)
    .catch(reject);
});

const deleteUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${userId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export { getSingleUser, updateUser, deleteUser };
