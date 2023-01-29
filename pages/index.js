import { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import CategoryButton from '../components/product/CategoryButton';
import getCategories from '../utils/data/categoryData';
import { getProducts, getProductsByCategory } from '../utils/data/productData';
import SearchField from '../components/product/SearchField';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = () => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
    });
  };

  useEffect(() => {
    getAllProducts();
    getCategories().then(setCategories);
  }, []);

  const handleCategoryClick = (categoryId) => {
    getProductsByCategory(categoryId).then((response) => {
      setProducts(response);
      setFilteredProducts(response);
    });
  };

  return (
    <div className="home-container">
      <SearchField products={products} setFilteredProducts={setFilteredProducts} />
      <div className="category-container">
        {categories.map((category) => (
          <CategoryButton onClick={() => handleCategoryClick(category.id)} category={category} key={category.id} />
        ))}
      </div>
      <div className="product-cards-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
