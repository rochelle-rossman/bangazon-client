import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Typography, Card, CardContent, CardMedia, CardActionArea,
} from '@mui/material';
import { useRouter } from 'next/router';
import formatCurrency from '../../utils/formatCurrency';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    maxHeight: 20,
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => router.push(`../products/${product.id}`)}>
        <CardMedia className={classes.media} image={product?.image} title={product.title} />
        <Typography style={{ fontFamily: 'monospace' }} gutterBottom variant="h5" component="h2">
          {product.title}
        </Typography>
        <Typography style={{ fontFamily: 'monospace' }} gutterBottom variant="h6" component="h2">
          {formatCurrency(product.price)}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
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
