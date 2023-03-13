import React from 'react';
import { useMutation } from "@apollo/client";
import { ADD_TO_CART_MUTATION } from "../../graphql/mutation";
import { useDispatch, useSelector } from "react-redux";
import useProtected from "../../hooks/useProtected";
import { useEffect, useState } from "react";
import { updateUser } from "../../features/user/authSlice";
import { useNavigate } from "react-router-dom";

const ProductSlider = ({ product }) => {
  useProtected()

  const state = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(()=>{
    setCart(state.auth.logedInUser.cart || [])
    setWishlist(state.auth.logedInUser.wishList || [])
  },[state])

  const [cart, setCart] = useState(state.auth?.logedInUser?.cart || [])
  const [wishlist, setWishlist] = useState(state.auth?.logedInUser?.wishList || [])

  const navigate = useNavigate();

  const inCart = cart.find((cartItem) => cartItem.productId === product.id);
  const inWishlist = wishlist.find((wishlistItem) => wishlistItem === product.id);

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
      onCompleted:(data) => {dispatch(updateUser(data.addToCart))},
      onError: (err) => console.log(err)
    })
  };



  const images = product?.images || [];
  const image = images[0] || '';
  const title = product?.title || 'NO TITLE';
  const brand = product?.brand || 'NO BRAND';
  const description = product?.description || 'NO DESCRIPTION';
  const discountPercentage = product?.discountPercentage || 0;
  const price = product?.price || 0
  const stock = product?.stock || 0;
  const category = product?.stocl || 'NO DESCRIPTION'

  const stockClass =
    stock <= 10
      ? "card-text fw-bold align-self-end text text-danger"
      : "card-text fw-bold align-self-end";

  return (
    <div className="row" style={{ padding: '60px' }}>
      <div className="col-md-8">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={`bg-dark ${index === 0 ? 'active' : ''}`}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
                key={index}
              />
            ))}
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image} className="d-block w-100" alt="..." style={{ objectFit: 'contain', objectPosition: 'center', height: '50vh', overflow: 'hidden' }} />
            </div>
            {images.slice(1).map((image, index) => (
              <div className="carousel-item" key={index}>
                <img src={image} className="d-block w-100" alt="..." style={{ objectFit: 'contain', objectPosition: 'center', height: '50vh', overflow: 'hidden' }} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className="col-md-4">
        <div className="card">
          <div className="card-header" style={{ fontWeight: 'bold', fontSize: '40px' }}>
            {title}
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: 'bold', color: 'gray' }}>Recommended price: ${price}</h5>
            <p></p>
            <span class="badge text-bg-danger" style={{ fontWeight: 'bold', fontSize: '25px' }}>SAVE {discountPercentage}%</span>
            <p></p>
            <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '45px' }}>Now: ${(price*(1-discountPercentage/100)).toFixed(2)}</h5>
            <h5 className={stockClass} style={{ fontWeight: 'bold' }}>In stock: {stock}</h5>
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: 'bold' }}>Brief Description</h5>
            <p className="card-text" >{description}</p>
            <button className="btn btn-primary fw-bold align-self-end"
            onClick={!inCart ? handleClick : () => navigate("/cart")}
             >{inCart ? "Check cart" : "Add to cart"}
             </button>
          </div>
        </div>
      </div>
<div>
  <p>

  </p>
</div>

      <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Overview
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>Overview</strong> ... <code></code>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Specifications
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>Specifications</strong> ... <code></code>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingThree">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Buying Options
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>Buying Options</strong> ... <code></code>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default ProductSlider;
