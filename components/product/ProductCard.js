import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography, Card, CardContent, CardMedia, Button,
} from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useRouter } from 'next/router';
import formatCurrency from '../../utils/formatCurrency';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cardContent: {
    maxHeight: '70%',
    overflow: 'auto',
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product?.image} title={product.title} />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
          {formatCurrency(product.price)}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </CardContent>
      <Button className={classes.button} onClick={(() => router.push(`../products/${product.id}`))}><PageviewIcon />VIEW</Button>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    store: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    price: PropTypes.number,
    productType: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
