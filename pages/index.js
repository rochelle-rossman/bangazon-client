import { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import CategoryButton from '../components/product/CategoryButton';
import getCategories from '../utils/data/categoryData';
import { getProducts, getProductsByCategory } from '../utils/data/productData';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  const handleCategoryClick = (categoryId) => {
    getProductsByCategory(categoryId).then((response) => setProducts((response)));
  };

  return (
    <>
      <div className="home-container">
        <div className="category-container">
          {categories.map((category) => (
            <CategoryButton onClick={() => handleCategoryClick(category.id)} category={category} key={category.id} />
          ))}
        </div>
        <div className="product-cards-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
