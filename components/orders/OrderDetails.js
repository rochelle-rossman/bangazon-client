import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  List, Typography, ListItem, ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
}));

const OrderDetails = ({ orderObj }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5">Order Details</Typography>
      <List>
        <ListItem>
          <ListItemText primary="ID" secondary={orderObj.id} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Store" secondary={orderObj.store} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Customer" secondary={orderObj.customer} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ordered On" secondary={orderObj.orderedOn} />
        </ListItem>
        <ListItem>
          {/* <ListItemText primary="Payment Method" secondary={orderObj.payment_method.label} /> */}
        </ListItem>
        <ListItem>
          {/* <ListItemText primary="Card Number" secondary={orderObj.paymentMethod.cardNumber} /> */}
        </ListItem>
        <ListItem>
          {/* <ListItemText primary="Products" secondary={orderObj.products.map((p) => `${p.id} (${p.quantity})`).join(', ')} /> */}
        </ListItem>
        <ListItem>
          <ListItemText primary="Status" secondary={orderObj.status} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Total" secondary={orderObj.total} />
        </ListItem>
      </List>
    </div>
  );
};

OrderDetails.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    store: PropTypes.string.isRequired,
    customer: PropTypes.arrayOf(PropTypes.string).isRequired,
    orderedOn: PropTypes.string.isRequired,
    paymentMethod: PropTypes.shape({
      label: PropTypes.string.isRequired,
      cardNumber: PropTypes.string.isRequired,
    }).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
    ).isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderDetails;
