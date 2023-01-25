import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/product/ProductCard';
import { getProductsByStore } from '../../utils/data/productData';
import { getSingleStore } from '../../utils/data/storeData';

export default function StoreView() {
  const router = useRouter();
  const { storeId } = router.query;
  const [store, setStore] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByStore(storeId).then(setProducts);
    getSingleStore(storeId).then(setStore);
  }, [storeId]);

  return (
    <div className="home-container">
      <h1>{store.name}</h1>
      <div className="product-cards-container">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
