import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OrderDetails from '../../../components/orders/OrderDetails';
import { getProductOrder } from '../../../utils/data/orderData';

export default function ViewOrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getProductOrder(orderId).then(setOrder);
  }, [orderId]);

  return (
    <OrderDetails orderObj={order} />
  );
}
