/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table, TableBody, TableCell, TableRow, TableHead, Button, Select, FormControl, MenuItem, CardActionArea,
} from '@mui/material';
import { useRouter } from 'next/router';
import { updateOrder } from '../../utils/data/orderData';
import formatCurrency from '../../utils/formatCurrency';
import { getCustomersPaymentMethods } from '../../utils/data/paymentMethodData';
import { useAuth } from '../../utils/context/authContext';

export default function ShoppingCart({
  productOrderObj, handleDecrement, handleIncrement, handleDelete,
}) {
  const total = productOrderObj && productOrderObj.length > 0 ? productOrderObj.reduce((acc, productOrder) => acc + productOrder.product.price * productOrder.quantity, 0) : 0;
  const [payments, setPayments] = useState([]);
  const { user } = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const router = useRouter();

  useEffect(() => {
    getCustomersPaymentMethods(user.id)
      .then((response) => setPayments(response));
  }, [user]);

  const handleCheckOut = () => {
    productOrderObj.forEach((order) => {
      updateOrder(order.order.id, {
        status: 'completed',
        paymentMethod: selectedPaymentMethod.id,
        products: [
          {
            id: order.product.id,
            quantity: order.quantity,
          },
        ],
      }).then(() => router.push('/'));
    });
  };

  return (
    <>
      {productOrderObj.length ? (
        <>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>Product</b>
                  </TableCell>
                  <TableCell align="center">
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Price</b>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {productOrderObj.map(({ product, quantity }) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>
                        <img src={product.image} alt={product.title} width={100} height={100} />
                        {product.title}
                      </CardActionArea>
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleDecrement(product.id)}>-</Button>
                      {quantity}
                      <Button onClick={() => handleIncrement(product.id)} disabled={quantity >= product.inventory}>
                        +
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {formatCurrency(product.price)} {quantity > 1 ? 'each' : ''}
                    </TableCell>
                    <TableCell align="center">
                      <Button color="error" size="small" fontSize="small" onClick={() => handleDelete(productOrderObj[0].id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TableCell align="center">
              <div style={{ justifyContent: 'flex-end' }}>
                <b>Total:</b> {formatCurrency(total)}
              </div>
              <div style={{ justifyContent: 'flex-end', margin: '15px' }}>
                <FormControl fullWidth required>
                  <Select value={selectedPaymentMethod.id} onChange={(e) => setSelectedPaymentMethod(payments.find((payment) => payment.id === e.target.value))}>
                    {payments.map((payment) => (
                      <MenuItem key={payment.id} value={payment.id}>
                        {payment.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div style={{ justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="success" onClick={() => handleCheckOut()}>
                  Check Out
                </Button>
              </div>
            </TableCell>
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '10px',
            flexWrap: 'wrap',
          }}
        >
          <h2>NO ITEMS HAVE BEEN ADDED TO YOUR CART</h2>
          <Button variant="outlined" color="success" onClick={() => router.push('/')}>
            Continue Shopping
          </Button>
        </div>
      )}
    </>
  );
}

ShoppingCart.propTypes = {
  productOrderObj: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        inventory: PropTypes.number,
        image: PropTypes.string,
        store: PropTypes.number,
        product_type: PropTypes.number,
      }),
      order: PropTypes.shape({
        id: PropTypes.number,
        ordered_on: PropTypes.string,
        status: PropTypes.string,
        store: PropTypes.number,
        customer: PropTypes.number,
        payment_method: PropTypes.number,
        products: PropTypes.arrayOf(PropTypes.number),
      }),
      quantity: PropTypes.number,
    }),
  ).isRequired,
  handleDecrement: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
