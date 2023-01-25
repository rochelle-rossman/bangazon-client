import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography, Card, CardMedia, Button,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import Link from 'next/link';
import Link from 'next/link';
import formatCurrency from '../../utils/formatCurrency';

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

export default function ProductDetails({ product }) {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // Dispatch an action to add the product to the cart
    console.warn(`Adding ${quantity} of ${product.title} to cart`);
  };
  return (
    <div className={classes.root}>
      <div className={classes.cardContainer}>
        <Typography gutterBottom variant="h4">
          {product.title}
        </Typography>
        <Link href={`../../stores/${product.store?.id}`} passHref>
          <Typography variant="h5">{product.store?.name}</Typography>
        </Link>
        <Card className={classes.card}>{typeof product.image === 'string' && <CardMedia className={classes.media} image={product.image} title={product.title} />}</Card>
      </div>
      <div className={classes.descriptionContainer}>
        <Typography variant="body" color="textSecondary">
          {product.description}
        </Typography>
        <div className={classes.quantity}>
          <Typography variant="h5">{formatCurrency(product.price)}</Typography>
          <Button onClick={handleDecrement}>-</Button>
          <span>{quantity}</span>
          <Button onClick={handleIncrement}>+</Button>
          <Button onClick={addToCart}>
            <AddShoppingCartIcon fontSize="large" />
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.shape({
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
  }).isRequired,
};
