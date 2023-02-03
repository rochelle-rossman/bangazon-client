import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import OrdersTable from '../../../components/orders/OrderTable';
import ProductTable from '../../../components/product/ProductTable';
import StoreForm from '../../../components/store/StoreForm';
import { getOrdersByStore } from '../../../utils/data/orderData';
import { getProductsByStore } from '../../../utils/data/productData';
import { getStoreBySeller } from '../../../utils/data/storeData';

export default function StoreManager() {
  const router = useRouter();
  const { userId } = router.query;
  const [store, setStore] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  // Get orders and products by store and display them in lists, with dynamic links to details and update/create forms

  useEffect(() => {
    getStoreBySeller(userId).then((res) => {
      if (res.length > 0) {
        setStore(res[0]);
        getOrdersByStore(res[0].id).then(setOrders);
        getProductsByStore(res[0].id).then(setProducts);
      } else {
        setStore(null);
      }
    });
  }, [userId]);

  return (
    <>
      {store ? (
        <Button variant="contained" style={{ margin: '10px' }} onClick={() => router.push(`./edit/${store.id}`)}>
          Update Store
        </Button>
      ) : (
        <StoreForm store={store} />
      )}
      <OrdersTable orders={orders} />
      <ProductTable products={products} />
    </>
  );
}
