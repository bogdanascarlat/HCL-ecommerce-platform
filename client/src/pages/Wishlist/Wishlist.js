import { useQuery } from "@apollo/client";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { GET_PRODUCTS_WISHLIST } from "../../graphql/query";
import useProtected from "../../hooks/useProtected";

const WishlistProductCard = ({ product }) => {
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
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          className="btn btn-primary h-100"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <svg
            className="pe-1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>

          <p>Buy</p>
        </button>
      </div>
    </div>
  );
};

const Wishlist = () => {
  useProtected();

  const { data, loading, error } = useQuery(GET_PRODUCTS_WISHLIST);

  if (loading) return "loading...";

  if (error) {
    console.error(error);
    return "error";
  }

  const wishlist = data?.getProductsWishlist;

  return (
    <>
      <Navbar />

      <div className="container d-flex flex-column my-5">
        <h3 className="text-muted align-self-start">WishList</h3>
        {wishlist.map((prod) => (
          <WishlistProductCard product={prod} key={prod.id} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
