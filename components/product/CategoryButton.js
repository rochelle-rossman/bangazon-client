import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function CategoryButton({ category, onClick }) {
  return (
    <Button onClick={onClick} variant="outlined" shape="rounded" style={{ margin: '0 10px 10px 0' }}>
      {category.label}
    </Button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
