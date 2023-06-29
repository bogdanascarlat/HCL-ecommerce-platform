import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { useQuery } from '@apollo/client';
import { GET_ITEMS, GET_PROFILE_QUERY } from '../../graphql/query';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const SingleProductPage = () => {
  const { id: selectedProductId } = useParams();

  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { id: selectedProductId },

  });

  useEffect(() => {
    if (data) {
      const browsingHistory = JSON.parse(localStorage.getItem("browsingHistory")) || [];
      const product = data.getAllProducts.find((product) => product.id === selectedProductId);
      const updatedHistory = [...browsingHistory.filter((p) => p.id !== selectedProductId), product];
      localStorage.setItem("browsingHistory", JSON.stringify(updatedHistory));
    }
  }, [data, selectedProductId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const selectedProduct = data.getAllProducts.find(
    (product) => product.id === selectedProductId
  );

  
  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  
  return (
    <>
      <Navbar />
      <ProductSlider product={selectedProduct} productId={selectedProduct.id}  />
      <Footer />
    </>
  );
};

export default SingleProductPage;
