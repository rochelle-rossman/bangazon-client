import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography, Card, CardMedia, Button, Badge,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/router';
import Link from 'next/link';
import formatCurrency from '../../utils/formatCurrency';
import { useAuth } from '../../utils/context/authContext';
import { updateOrder, getOpenOrdersByCustomer, createOrder } from '../../utils/data/orderData';

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    display: 'flex',
    flexWrap: 'wrap',
  },
  media: {
    height: 500,
  },
  button: {
    margin: '10px 0',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
  },
  cardContainer: {
    width: '70%',
    flexGrow: 1,
  },
  descriptionContainer: {
    width: '30%',
    display: 'flex',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: '10px',
  },
  '@media (max-width: 900px)': {
    descriptionContainer: {
      width: '100%',
      textAlign: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  },
});

export default function ProductDetails({ productObj }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const router = useRouter();

  const handleIncrement = () => {
    if (quantity + 1 <= productObj.inventory) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    getOpenOrdersByCustomer(user.id).then((openOrders) => {
      // check if open orders exist
      if (openOrders.length > 0) {
        // check if product is already in open order
        const openOrder = openOrders[0];
        const payload = { products: [], status: 'in-progress' };
        if (openOrder.products && openOrder.products.find((product) => product.id === productObj.id)) {
          // find the product in the open order
          const productInOrder = openOrder.products.find((product) => product.id === productObj.id);
          // update product quantity in open order
          productInOrder.quantity += quantity;
          payload.products = openOrder.products;
        } else {
          // add product to open order
          openOrder.products = openOrder.products ? openOrder.products : [];
          openOrder.products.push({ id: productObj.id, quantity });
          payload.products = openOrder.products;
        }
        // send updated product array to server
        updateOrder(openOrder.id, payload).then(() => {
          router.push(`/users/shoppingCart/${user.id}`);
        });
      } else {
        // create new order
        const newOrder = {
          store: productObj.store.id,
          products: [{ id: productObj.id, quantity }],
        };
        createOrder(newOrder, user.id).then(() => {
          router.push(`/users/shoppingCart/${user.id}`);
        });
      }
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <h4>{productObj.title}</h4>
        <Link href={`../../stores/${productObj.store?.id}`} passHref>
          <h5>{productObj.store?.name}</h5>
        </Link>
        <Card className={classes.card}>{typeof productObj.image === 'string' && <CardMedia className={classes.media} image={productObj.image} title={productObj.title} />}</Card>
      </div>
      <div className={classes.descriptionContainer}>
        <Typography variant="body" color="textSecondary">
          {productObj.description}
        </Typography>
        <div className={classes.quantity}>
          <Typography variant="h5">{formatCurrency(productObj.price)}</Typography>
          {productObj.inventory > 0 ? (
            <>
              <Button disabled={quantity === 1} onClick={handleDecrement}>
                -
              </Button>
              <span>{quantity}</span>
              <Button disabled={quantity + 1 > productObj.inventory} onClick={handleIncrement}>
                +
              </Button>
            </>
          ) : (
            ''
          )}
          <Button onClick={addToCart} disabled={productObj.inventory <= 0}>
            <AddShoppingCartIcon fontSize="large" />
          </Button>
          {productObj.inventory <= 0 ? <Badge badgeContent="Out of Stock" /> : ''}
          {productObj.inventory <= 5 && productObj.inventory > 0 ? <Badge color="secondary" badgeContent="Low Stock" /> : ''}
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    store: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
    price: PropTypes.number,
    productType: PropTypes.string,
    image: PropTypes.string,
    inventory: PropTypes.number,
  }).isRequired,
};
