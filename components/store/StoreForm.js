import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createStore, updateStore } from '../../utils/data/storeData';
import { useAuth } from '../../utils/context/authContext';

function StoreForm({ store }) {
  const [formData, setFormData] = useState({});
  const { user } = useAuth();
  const userId = user ? user.id : null;
  const router = useRouter();

  useEffect(() => {
    if (store) {
      setFormData(store);
    }
  }, [store]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (store) {
      updateStore(formData, store.id).then(() => router.push(`/users/store/${user.id}`));
    } else {
      const newStore = { ...formData, seller: userId };
      createStore(newStore).then(() => router.push(`/users/store/${user.id}`));
    }
  };

  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1, width: '90%', margin: '15px' },
      }}
      autoComplete="off"
    >
      <Form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <TextField onChange={handleChange} name="name" label="Store Name" variant="outlined" fullWidth value={formData.name || ''} required />
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
          {store ? 'Update Store' : 'Create Store'}
        </Button>
      </Form>
    </Box>
  );
}

StoreForm.propTypes = {
  store: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

StoreForm.defaultProps = {
  store: PropTypes.shape({
    name: '',
  }),
};

export default StoreForm;
