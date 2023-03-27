import Categories from "../../components/Categories/Categories";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import SwitchBar from "../../components/SwitchBar/SwitchBar";
import { batch, useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { fillWithAllProducts } from "../../features/products/productSlice";
import { GET_ITEMS } from "../../graphql/query";
import useProtected from "../../hooks/useProtected";
import usePaginate from "../../hooks/usePaginate";
import Paginate from "../../components/Paginate/Paginate";
import { logout } from "../../features/user/authSlice";
import { addErrorMessage } from "../../features/message/messageSlice";
import Footer from "../../components/Footer/Footer";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const Dashboard = () => {
  useProtected();

  const { value, filter } = useSelector((state) => state.products);
  const [getAllItemFunction] = useLazyQuery(GET_ITEMS);
  const dispatch = useDispatch();
  let products = value;
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1);
  };

  console.log(priceRange);

  useEffect(() => {
    getAllItemFunction({ variables: { filter } })
      .then((res) => dispatch(fillWithAllProducts(res.data.getAllProducts)))
      .catch((err) => {
        batch(() => {
          dispatch(logout());
          dispatch(addErrorMessage(err.message));
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  products = products.filter(
    (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
  );

  const cards = products.map((product, index) => {
    return <ProductCard key={product.title + index} product={product} />;
  });

  const [productsPerPage, setProductsPerPage] = useState(20);
  const [shownCards, currentPage, setCurrentPage, numberOfPages] = usePaginate(
    cards,
    productsPerPage
  );

  return (
    <>
      <Navbar />

      <div className="d-flex mt-5 mx-5">
        <div className="row  w-100">
          <div className="d-none d-lg-block col-auto">
            <Categories />
          </div>
          <div className="col">
            <SwitchBar
              setProductsPerPage={setProductsPerPage}
              setCurrentPage={setCurrentPage}
              priceRange={priceRange}
              handlePriceChange={handlePriceChange}
            />
            <div className="row row-cols-auto g-4">{shownCards}</div>
            <div className="d-flex justify-content-center my-4">
              <Paginate
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
