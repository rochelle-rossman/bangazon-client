import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Form } from 'react-bootstrap';
import { getSingleUser, updateUser } from '../../utils/data/userData';
import { registerUser } from '../../utils/auth';

const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

const initialUserState = {
  firstName: '',
  lastName: '',
  email: '',
  createdOn: '',
  streetAddress: '',
  city: '',
  state: '',
  zipcode: undefined,
};

function RegistrationForm({ user, onUpdate }) {
  const [formData, setFormData] = useState(initialUserState);
  const router = useRouter();
  const [selectedState, setSelectedState] = useState(user.state ? user.state : states[0]);

  useEffect(() => {
    if (user.id) {
      getSingleUser(user.id).then((response) => {
        setFormData(response);
        setSelectedState(response.state);
      });
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setSelectedState(value);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(user.id, { ...formData, state: selectedState });
      router.push(`../../users/${user.id}`);
    } else {
      registerUser(user, { ...formData, state: selectedState, uid: user.uid }).then(() => onUpdate(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>{user.id ? 'Update Your Information' : 'Welcome to Bangazon! Create your profile to begin shopping or to open your own e-store!'}</h3>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '90%' },
        }}
        autoComplete="off"
      >
        <TextField required onChange={handleChange} InputLabelProps={{ shrink: true }} label="First Name" name="firstName" variant="outlined" value={formData.firstName} />
        <TextField onChange={handleChange} InputLabelProps={{ shrink: true }} label="Last Name" name="lastName" value={formData.lastName} variant="outlined" required />
        <TextField onChange={handleChange} InputLabelProps={{ shrink: true }} label="Email Address" name="email" variant="outlined" required value={formData.email} />
        <TextField onChange={handleChange} InputLabelProps={{ shrink: true }} name="streetAddress" label="Street Address" value={formData.streetAddress} variant="outlined" required />
        <TextField onChange={handleChange} InputLabelProps={{ shrink: true }} label="City" name="city" variant="outlined" value={formData.city} required />
        <FormControl required>
          <InputLabel id="state-label">State</InputLabel>
          <Select label="state-label" id="state" value={selectedState} onChange={handleChange} name="state">
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField onChange={handleChange} InputLabelProps={{ shrink: true }} name="zipcode" value={formData.zipcode} label="Zipcode" variant="outlined" required />
      </Box>
      <Button variant="outlined" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegistrationForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
    state: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.number,
  }),
  onUpdate: PropTypes.func.isRequired,
};

RegistrationForm.defaultProps = {
  user: initialUserState,
};
export default RegistrationForm;
