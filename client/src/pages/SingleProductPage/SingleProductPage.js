import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../../graphql/query';
import { useSelector } from 'react-redux';

const SingleProductPage = () => {
  const selectedProductId = useSelector(
    (state) => state.productId.selectedProductId
  );

  const { loading, error, data } = useQuery(GET_ITEMS, {
    variables: { id: selectedProductId } ,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <ProductSlider product={data.getAllProducts[selectedProductId-1]} />
      <Footer />
    </>
  );
};

export default SingleProductPage;