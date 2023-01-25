import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ShoppingCart from '../../../components/orders/ShoppingCart';
import { getProductOrderByCustomer } from '../../../utils/data/orderData';

export default function ShoppingCartView() {
  const router = useRouter();
  const { userId } = router.query;
  const [openOrder, setOpenOrder] = useState([]);

  useEffect(() => {
    // first get the orders associated with the user
    getProductOrderByCustomer(userId).then((response) => {
      // check if there is an open order associated with the user
      const openOrders = response.filter((order) => order.order.status === 'in-progress');
      setOpenOrder(openOrders);
    });
  }, [userId]);

  return (
    <>
      <ShoppingCart productOrderObj={openOrder} />
    </>
  );
}
