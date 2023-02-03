import React, { useEffect, useState } from 'react';
import PaymentMethodsTable from '../../components/user/PaymentMethodsTable';
import UserInfoCard from '../../components/user/UserInfoCard';
import OrdersTable from '../../components/orders/OrderTable';
import { useAuth } from '../../utils/context/authContext';
import { getCompleteOrdersByCustomer } from '../../utils/data/orderData';
import { getCustomersPaymentMethods } from '../../utils/data/paymentMethodData';

export default function UserView() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);

  const getThePaymentMethods = () => {
    getCustomersPaymentMethods(user.id).then((methods) => {
      setPaymentMethods(methods);
    });
  };

  useEffect(() => {
    getCustomersPaymentMethods(user.id).then((methods) => {
      setPaymentMethods(methods);
    });
    getCompleteOrdersByCustomer(user.id).then(setOrders);
  }, [user.id]);

  return (
    <div className="userView">
      <div className="userInfoCard-orderHistory-container">
        <UserInfoCard className="userInfoCard" userObj={user} />
        <OrdersTable className="orderHistory" orders={orders} />
      </div>
      <PaymentMethodsTable className="paymentMethods" paymentMethods={paymentMethods} onUpdate={getThePaymentMethods} />
    </div>
  );
}
