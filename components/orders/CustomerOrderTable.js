import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import formatCurrency from '../../utils/formatCurrency';

export default function CustomerOrdersTable({ orders }) {
  const router = useRouter();
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
                <Tooltip title="View Order Details" placement="right">
                  <Button onClick={() => router.push(`/users/orders/${order.id}`)}>{order.id}</Button>
                </Tooltip>
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
