/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Box, FormControl, Select, MenuItem, InputLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createProduct, updateProduct } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';
import { getStoreBySeller } from '../../utils/data/storeData';
import getCategories from '../../utils/data/categoryData';

const initialState = {
  title: '',
  description: '',
  price: '',
  image: '',
  productType: '',
  inventory: '',
};

function ProductForm({ product }) {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [seller, setSeller] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(product?.productType ? product.productType : '');

  useEffect(() => {
    if (product?.productType) {
      setSelectedCategory(product.productType);
    }
    getStoreBySeller(user.id).then((store) => setSeller(store));
    getCategories().then(setCategories);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.id) {
      updateProduct(formData, product.id);
      router.push(`../product/${product.id}`);
    } else {
      const [{ id }] = seller;
      const newProduct = { ...formData, store: id, productType: selectedCategory };
      createProduct(newProduct);
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '90%' },
        }}
        autoComplete="off"
      >
        <TextField onChange={handleChange} name="title" label="Title" variant="outlined" fullWidth value={formData.title} required />
        <TextField onChange={handleChange} name="description" label="Description" variant="outlined" fullWidth value={formData.description} required />
        <TextField onChange={handleChange} type="number" name="price" label="Price" variant="outlined" fullWidth value={formData.price} required />
        <TextField onChange={handleChange} helperText="Please enter a valid URL" name="image" label="Image" variant="outlined" fullWidth value={formData.image} required />
        <TextField onChange={handleChange} type="number" name="inventory" label="Inventory" variant="outlined" fullWidth value={formData.inventory} required />
        <FormControl required>
          <InputLabel>Product Type</InputLabel>
          <Select onChange={handleSelectChange} name="productType" value={selectedCategory} variant="outlined">
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Create Product
      </Button>
    </form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    store: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    productType: PropTypes.string.isRequired,
    inventory: PropTypes.number.isRequired,
  }),
};

ProductForm.defaultProps = {
  product: {
    title: '',
    description: '',
    price: 0,
    image: '',
    productType: '',
    inventory: 0,
  },
};

export default ProductForm;
