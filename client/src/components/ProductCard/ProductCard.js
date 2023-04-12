import { useMutation } from "@apollo/client";
import { ADD_TO_CART_MUTATION } from "../../graphql/mutation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useProtected from "../../hooks/useProtected";
import { useEffect, useState } from "react";
import { updateUser } from "../../features/user/authSlice";
import { motion } from "framer-motion";
import { useContext } from "react";

const ProductCard = ({ product, onProductClick }) => {
  useProtected();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.auth.loggedInUser) {
      setCart(state.auth.loggedInUser.cart || []);
      setWishlist(state.auth.loggedInUser.wishList || []);
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [state]);

  const [cart, setCart] = useState(state.auth?.loggedInUser?.cart || []);
  const [wishlist, setWishlist] = useState(
    state.auth?.loggedInUser?.wishList || []
  );

  const navigate = useNavigate();

  const inCart = cart.find((cartItem) => cartItem.productId === product.id);
  const inWishlist = wishlist.find(
    (wishlistItem) => wishlistItem === product.id
  );

  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      cartInput: {
        productId: product.id,
        quantity: 1,
      },
    },
    fetchPolicy: "no-cache",
  });

  const handleClick = () => {
    addToCart({
      // eslint-disable-next-line no-restricted-globals
      onCompleted: (data) => {
        dispatch(updateUser(data.addToCart));
      },
      onError: (err) => console.log(err),
    });
  };

  const image = product?.images[0] || "";
  const title = product?.title || "NO TITLE";
  const brand = product?.brand || "NO BRAND";
  const discountPercentage = product?.discountPercentage || 0;
  const price = product?.price || 0;
  const stock = product?.stock || 0;

  const stockClass =
    stock <= 10
      ? "card-text fw-bold align-self-end text text-danger"
      : "card-text fw-bold align-self-end";

  return (
    <motion.div
      className=" g-col col-12 col-lg-auto "
      style={{ maxWidth: "var(--lg-max-width)" }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{ duration: 0.15 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="d-flex card" style={{ height: "100%" }}>
        <div className="d-flex card-header mb-2 w-100 justify-content-between align-items-center">
          <span className="badge text-bg-warning">{discountPercentage} %</span>
          <span>
            <button className="btn">
              {" "}
              {inWishlist ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-5v-1h5v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-6.769 8.852-8.346 12-2.944 3.125-5.362 12-3.848 12 2.944 0 .746-.156 1.496-.423 2.253-1.116-.902-2.534-1.445-4.077-1.445-3.584 0-6.5 2.916-6.5 6.5 0 2.063.97 3.901 2.473 5.093z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.653 19.415c-1.162 1.141-2.389 2.331-3.653 3.585-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 1.269-.424 2.546-1.154 3.861l-1.483-1.484c.403-.836.637-1.631.637-2.377 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.239-2.191 1.414 1.414zm7.347-5.415h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z" />
                </svg>
              )}{" "}
            </button>
          </span>
        </div>
        <motion.div
          className="d-flex justify-content-center px-2"
          onClick={onProductClick}
          style={{ cursor: "pointer" }}
        >
          <img
            className="img-fluid mt-2"
            alt="img"
            src={image}
            style={{ maxHeight: 120 }}
          ></img>
        </motion.div>
        <div className="d-flex row card-body px-4">
          <h5 className="card-title fw-bold align-self-end fs-6 text">
            {title}
          </h5>
          <p className="card-text align-self-end">{brand}</p>
          <p className={stockClass}>In stock: {stock} units</p>
          <p className="mb-0 align-self-end" style={{ fontSize: ".7em" }}>
            MSRP: ${price}
          </p>
          {
            <p className="card-text fw-bold align-self-end mt-0">
              Price: ${(price * (1 - discountPercentage / 100)).toFixed(2)}
            </p>
          }
          <button
            className="btn btn-primary fw-bold align-self-end"
            onClick={!inCart ? handleClick : () => navigate("/cart")}
          >
            {inCart ? "Check cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
