import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { deletePaymentMethod } from '../../utils/data/paymentMethodData';

export default function PaymentMethodsTable({ paymentMethods, onUpdate }) {
  const router = useRouter();
  const deletePayment = (paymentMethod) => {
    deletePaymentMethod(paymentMethod.id).then(() => onUpdate());
  };

  const editPaymentMethod = (paymentMethod) => {
    router.push(`../../users/paymentMethods/edit/${paymentMethod.id}`);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Payment Method Label</b>
            </TableCell>
            <TableCell align="right">
              <b>Card Number</b>
            </TableCell>
            <TableCell align="right">
              <b>Expiration Date</b>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentMethods.map((method) => (
            <TableRow key={method.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {method.label}
              </TableCell>
              <TableCell align="right">{method.card_number}</TableCell>
              <TableCell align="right">{method.expiration_date}</TableCell>
              <TableCell>
                <Button color="success" onClick={() => editPaymentMethod(method)}>
                  <EditIcon />
                </Button>
                <Button color="error" onClick={() => deletePayment(method)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableCell>
        <Button onClick={() => router.push('../users/paymentMethods/new')}>Add A New Payment Method</Button>
      </TableCell>
    </TableContainer>
  );
}

PaymentMethodsTable.propTypes = {
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      card_number: PropTypes.string.isRequired,
      expiration_date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
