import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OrderDetails from '../../../components/orders/OrderDetails';
import { getSingleOrder } from '../../../utils/data/orderData';

export default function ViewOrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState({});

  useEffect(() => {
    getSingleOrder(orderId).then(setOrder);
  }, [orderId]);

  return (
    <OrderDetails orderObj={order} />
  );
}
