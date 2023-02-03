import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ShoppingCart from '../../../components/orders/ShoppingCart';
import { deleteProductOrder, getOpenProductOrderByCustomer, updateProductOrder } from '../../../utils/data/orderData';

export default function ShoppingCartView() {
  const router = useRouter();
  const { userId } = router.query;
  const [openOrder, setOpenOrder] = useState([]);

  useEffect(() => {
    getOpenProductOrderByCustomer(userId).then(setOpenOrder);
  }, [userId]);

  const handleDecrement = (productId) => {
    const productOrderToUpdate = openOrder.find((productOrder) => productOrder.product.id === productId);
    if (productOrderToUpdate.quantity > 1) {
      const updatedProductOrders = openOrder.map((productOrder) => {
        if (productOrder.product.id === productId) {
          return { ...productOrder, quantity: productOrder.quantity - 1 };
        }
        return productOrder;
      });
      setOpenOrder(updatedProductOrders);
      updateProductOrder(productOrderToUpdate.id, {
        product: productOrderToUpdate.product.id,
        order: productOrderToUpdate.order.id,
        quantity: productOrderToUpdate.quantity - 1,
      }).then(() => setOpenOrder(updatedProductOrders));
    } else {
      deleteProductOrder(productOrderToUpdate.id).then(() => {
        setOpenOrder(openOrder.filter((productOrder) => productOrder.id !== productOrderToUpdate.id));
      });
    }
  };

  const handleIncrement = (productId) => {
    const updatedProductOrders = openOrder.map((productOrder) => {
      if (productOrder.product.id === productId) {
        return { ...productOrder, quantity: productOrder.quantity + 1 };
      }
      return productOrder;
    });
    setOpenOrder(updatedProductOrders);
    const productOrderToUpdate = updatedProductOrders.find((productOrder) => productOrder.product.id === productId);
    updateProductOrder(productOrderToUpdate.id, {
      product: productOrderToUpdate.product.id,
      order: productOrderToUpdate.order.id,
      quantity: productOrderToUpdate.quantity,
    }).then(() => setOpenOrder(updatedProductOrders));
  };

  const handleDelete = (productId) => {
    const productOrderToUpdate = openOrder.find((productOrder) => productOrder.product.id === productId);
    if (productOrderToUpdate) {
      deleteProductOrder(productOrderToUpdate.id).then(() => {
        setOpenOrder(openOrder.filter((productOrder) => productOrder.id !== productOrderToUpdate.id));
      });
    }
  };

  return (
    <>
      <ShoppingCart productOrderObj={openOrder} handleDecrement={handleDecrement} handleIncrement={handleIncrement} handleDelete={handleDelete} />
    </>
  );
}
