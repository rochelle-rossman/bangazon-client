import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductDetails from '../../components/product/ProductDetails';
import { getSingleProduct } from '../../utils/data/productData';

export default function ProductDetailView() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    getSingleProduct(productId).then(setProduct);
  }, [router, productId]);

  return (
    <ProductDetails product={product} />
  );
}
