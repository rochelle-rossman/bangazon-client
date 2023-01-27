/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableRow, TableHead, Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import { updateOrder } from '../../utils/data/orderData';
import formatCurrency from '../../utils/formatCurrency';
import { getCustomersPaymentMethods } from '../../utils/data/paymentMethodData';
import { useAuth } from '../../utils/context/authContext';

export default function ShoppingCart({ productOrderObj }) {
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
        paymentMethod: selectedPaymentMethod,
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
                  <TableCell>
                    <b>Product</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Price</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {productOrderObj.map(({ product, quantity }) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={product.image} alt={product.title} width={100} height={100} />
                      {product.title}
                    </TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(product.price)} {quantity > 1 ? 'each' : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <div style={{ justifyContent: 'flex-end' }}>
                <b>Total:</b> {formatCurrency(total)}
              </div>
              <div style={{ justifyContent: 'flex-end' }}>
                <b>Payment Method:</b>
                <select value={selectedPaymentMethod.id} onChange={(e) => setSelectedPaymentMethod(payments.find((payment) => payment.id === e.target.value))}>
                  {payments.map((payment) => (
                    <option key={payment.id} value={payment.id}>
                      {payment.label}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ justifyContent: 'flex-end' }}>
                <Button onClick={(() => handleCheckOut())}>Check Out</Button>
              </div>
            </div>
          </div>
        </>

      ) : ('No Items In Your Cart')}
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
};
