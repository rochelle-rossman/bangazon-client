import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper,
} from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';

export default function CustomerOrdersTable({ orders }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Order #</b>
            </TableCell>
            <TableCell align="right">
              <b>Status</b>
            </TableCell>
            <TableCell align="right">
              <b>Total</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{order.status}</TableCell>
              <TableCell align="right">{formatCurrency(order.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomerOrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
