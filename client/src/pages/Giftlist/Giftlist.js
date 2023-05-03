import { useQuery } from "@apollo/client";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import {
  GET_PRODUCTS_WISHLIST,
  GET_SHARED_WISHLIST,
} from "../../graphql/query";
import useProtected from "../../hooks/useProtected";

const GiftListProductCard = ({ product }) => {
  return (
    <div className="d-flex mb-4">
      <div
        className="card w-100"
        style={{
          maxWidth: 540,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img
              src={product?.thumbnail}
              style={{ maxWidth: 50 }}
              className="img-fluid rounded-start my-5"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{product?.title}</h5>
              <p className="card-text">${product?.price}</p>
              <p className="card-text">
                <small className="text-muted">{product?.category}</small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  This product is in the shared wishlist.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GiftList = () => {
  useProtected();

  // const {
  //   data: sharedData,
  //   loading: sharedLoading,
  //   error: sharedError,
  // } = useQuery(GET_SHARED_WISHLIST, {
  //   variables: { userId },
  // });

  const {
    data: wishlistData,
    loading: wishlistLoading,
    error: wishlistError,
  } = useQuery(GET_PRODUCTS_WISHLIST);

  // if (sharedLoading || wishlistLoading) return "loading...";

  // if (sharedError || wishlistError) {
  //   console.error(sharedError || wishlistError);
  //   return "error";
  // }

  // const sharedWishlist = sharedData?.getSharedWishlist;
  const wishlist = wishlistData?.getProductsWishlist;

  return (
    <>
      <Navbar />

      <div className="container d-flex flex-column my-5">
        <h3 className="text-muted align-self-start">GiftList</h3>

        {wishlist.length === 0 ? (
          <p>Your GiftList is empty.</p>
        ) : (
          <>
            {/* <p>
              Share this link with your friends so they can see your GiftList:
              https://example.com/giftlist/{giftListId}
            </p> */}

            <div className="row">
              {wishlist.map((prod) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={prod.id}>
                  <GiftListProductCard product={prod} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};
export default GiftList;
