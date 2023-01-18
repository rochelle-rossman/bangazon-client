import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card, CardActionArea, CardContent, makeStyles, CardMedia,
} from '@mui/material';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ProductCard({ product }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={product.image} title={product.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
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
    title: PropTypes.string,
    description: PropTypes.string,
    store: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    price: PropTypes.number,
    productType: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }).isRequired,
    image: PropTypes.string,
  }).isRequired,
};
