import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ProductCard from '../components/product/ProductCard';
import CategoryButton from '../components/product/CategoryButton';
import getCategories from '../utils/data/categoryData';
import { getProducts, getProductsByCategory } from '../utils/data/productData';
import SearchField from '../components/product/SearchField';
import { useAuth } from '../utils/context/authContext';
import RegistrationForm from '../components/user/RegistrationForm';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 20;

  const getAllProducts = () => {
    getProducts().then((productsArr) => {
      setProducts(productsArr);
      setFilteredProducts(productsArr);
      getCategories().then(setCategories);
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleCategoryClick = (categoryId) => {
    getProductsByCategory(categoryId).then((response) => {
      setProducts(response);
      setFilteredProducts(response);
      setSelectedCategoryId(categoryId);
    });
  };

  const handleReset = () => {
    setSelectedCategoryId(null);
    getAllProducts();
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const currentProducts = filteredProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage);

  return (
    <div className="home-container">
      {user && !user.id ? (
        <RegistrationForm user={user} onUpdate={getAllProducts} />
      ) : (
        <>
          <SearchField products={products} setFilteredProducts={setFilteredProducts} />
          <div className="category-container">
            {categories.map((category) => (
              <CategoryButton onClick={() => handleCategoryClick(category.id)} category={category} key={category.id} />
            ))}
            {selectedCategoryId !== null && (
              <Button color="error" onClick={() => handleReset()}>
                x
              </Button>
            )}
          </div>
          <div className="product-cards-container">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="pagination-container">
            {currentPage !== 0 && <Button onClick={handlePreviousPage}>Previous Page</Button>}
            {filteredProducts.length > (currentPage + 1) * productsPerPage && <Button onClick={handleNextPage}>Next Page</Button>}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
