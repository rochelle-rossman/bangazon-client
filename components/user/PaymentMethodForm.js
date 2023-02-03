import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import {
  TextField, Button, FormControl,
} from '@mui/material';
import { useRouter } from 'next/router';
import { updatePaymentMethod, createPaymentMethod, getSinglePaymentMethod } from '../../utils/data/paymentMethodData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  label: '',
  cardNumber: '',
  expirationDate: '',
};
function PaymentMethodForm({ paymentMethod }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expirationDateError, setExpirationDateError] = useState(false);

  useEffect(() => {
    if (paymentMethod.id) {
      getSinglePaymentMethod(paymentMethod.id).then(setFormData);
    }
  }, [paymentMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'cardNumber') {
      if (value.length !== 16) {
        setCardNumberError(true);
      } else {
        setCardNumberError(false);
      }
    }

    if (name === 'expirationDate') {
      const pattern = /^\d{2}\/\d{4}$/;
      if (!pattern.test(value)) {
        setExpirationDateError(true);
      } else {
        setExpirationDateError(false);
      }
    }
  };

  const isDisabled = cardNumberError || expirationDateError;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, customer: user.id };
    if (paymentMethod.id) {
      updatePaymentMethod(paymentMethod.id, payload).then(router.push(`/users/${user.id}`));
    } else {
      createPaymentMethod(payload).then(router.push(`/users/${user.id}`));
    }
  };

  return (
    <Form style={{ margin: 25 }} onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <TextField sx={{ mb: 1.5 }} onChange={handleChange} name="label" label="Label" variant="outlined" value={formData.label} required />
        <TextField sx={{ mb: 1.5 }} onChange={handleChange} type="number" name="cardNumber" label="Card Number" variant="outlined" error={cardNumberError} helperText={cardNumberError ? 'Card number must be 16 digits.' : ''} value={formData.cardNumber} required />
        <TextField sx={{ mb: 1.5 }} onChange={handleChange} name="expirationDate" label="Expiration Date" variant="outlined" error={expirationDateError} helperText={expirationDateError ? 'Expiration date must be in MM/YYYY format.' : ''} value={formData.expirationDate} required />

        <Button type="submit" variant="contained" color="primary" disabled={isDisabled}>
          Submit
        </Button>
      </FormControl>
    </Form>
  );
}

PaymentMethodForm.propTypes = {
  paymentMethod: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    cardNumber: PropTypes.string,
    expirationDate: PropTypes.string,
    customer: PropTypes.number,
  }),
};

PaymentMethodForm.defaultProps = {
  paymentMethod: initialState,
};

export default PaymentMethodForm;
