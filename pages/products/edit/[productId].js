import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductForm from '../../../components/product/ProductForm';
import { getSingleProduct } from '../../../utils/data/productData';

export default function EditProduct() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState({});

  useEffect(() => {
    getSingleProduct(productId).then(setProduct);
  }, [productId]);

  return (
    <ProductForm product={product} />
  );
}
