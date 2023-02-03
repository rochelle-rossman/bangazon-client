import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card, CardMedia, CardContent, Typography, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import formatCurrency from '../../utils/formatCurrency';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    width: '100%',
    margin: '16px',
  },
  cardMedia: {
    width: '40%',
    backgroundSize: 'contain',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    padding: '16px',
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
});

const OrderDetails = ({ orderObj }) => {
  const total = orderObj && orderObj.length > 0 ? orderObj.reduce((acc, productOrder) => acc + productOrder.product.price * productOrder.quantity, 0) : 0;

  const classes = useStyles();
  return (
    <>
      <h4> Order # {orderObj[0]?.order.id}</h4>
      <p>
        Ordered on: {orderObj[0]?.order.ordered_on}
        <br />
        Customer: {orderObj[0]?.order.customer.first_name} {orderObj[0]?.order.customer.last_name}
        <br />
        Store: {orderObj[0]?.order.store.name}
      </p>
      <Grid container spacing={2}>
        {orderObj.map((productOrder) => (
          <Grid item xs={12} key={productOrder.id}>
            <Card className={classes.card}>
              <CardMedia style={{ height: 200, width: 200 }} className={classes.cardMedia} image={productOrder.product.image} title={productOrder.product.title} />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">{productOrder.product.title}</Typography>
                <div className={classes.valueContainer}>
                  <Typography variant="body2" />
                  <Typography variant="body2">
                    <b>Quantity:</b> {productOrder.quantity}
                  </Typography>
                </div>
                <div className={classes.valueContainer}>
                  <Typography variant="body2" />
                  <Typography variant="body2">
                    <b>Price:</b> {formatCurrency(productOrder.product.price)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <p>
            <b>Order Total: {formatCurrency(total)}</b>
            <br />
            <b>Payment Method:</b> {orderObj[0]?.order.payment_method?.label}
            <br />
            <b>Shipping Address:</b>
            <br />
            {orderObj[0]?.order.customer.street_address},
            <br />
            {orderObj[0]?.order.customer.city}, {orderObj[0]?.order.customer.state}
            <br />
            {orderObj[0]?.order.customer.zipcode}
          </p>
        </div>
      </Grid>
    </>
  );
};

OrderDetails.propTypes = {
  orderObj: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        store: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        ordered_on: PropTypes.string,
        status: PropTypes.string.isRequired,
        store: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        customer: PropTypes.shape({
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          street_address: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          zipcode: PropTypes.number.isRequired,
        }).isRequired,
        payment_method: PropTypes.shape({
          id: PropTypes.number,
          label: PropTypes.string,
        }),
        products: PropTypes.arrayOf(PropTypes.shape({
          title: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        })).isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default OrderDetails;
