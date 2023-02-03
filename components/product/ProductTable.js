import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Button,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import formatCurrency from '../../utils/formatCurrency';

export default function ProductTable({ products }) {
  const router = useRouter();
  return (
    <TableContainer>
      <h3>Products</h3>
      <Table sx={{ minWidth: 350 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Item</b>
            </TableCell>
            <TableCell align="right">
              <b>inventory</b>
            </TableCell>
            <TableCell align="right">
              <b>Price</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Tooltip title="Update this product" placement="right">
                  <Button onClick={() => router.push(`/products/edit/${product.id}`)}>{product.title}</Button>
                </Tooltip>
              </TableCell>
              <TableCell align="right">{product.inventory}</TableCell>
              <TableCell align="right">{formatCurrency(product.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={() => router.push('/products/new')} variant="contained">
        Add Product
      </Button>
    </TableContainer>
  );
}

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      inventory: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
