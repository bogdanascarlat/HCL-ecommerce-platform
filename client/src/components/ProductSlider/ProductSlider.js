import React from 'react';
import { useMutation } from "@apollo/client";
import { ADD_TO_CART_MUTATION } from "../../graphql/mutation";
import { useDispatch, useSelector } from "react-redux";
import useProtected from "../../hooks/useProtected";
import { useEffect, useState } from "react";
import { updateUser } from "../../features/user/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './ProductSlider.css';
import  CompareProducts  from "../../components/CompareProducts/CompareProducts"



const ProductSlider = ({ product, productId }) => {
  useProtected()

  const state = useSelector((state) => state);
  const dispatch = useDispatch()

  useEffect(()=>{
    setCart(state.auth.loggedInUser.cart || [])
    setWishlist(state.auth.loggedInUser.wishList || [])
  },[state])

  const [cart, setCart] = useState(state.auth?.loggedInUser?.cart || [])
  const [wishlist, setWishlist] = useState(state.auth?.loggedInUser?.wishList || [])

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
  const description = product?.description || 'NO DESCRIPTION';
  const discountPercentage = product?.discountPercentage || 0;
  const price = product?.price || 0
  const stock = product?.stock || 0;
  const specs = product?.specs || {};

  console.log(specs);


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

      <motion.div className='col-md-4'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}>
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
      </motion.div>
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
      <strong>Product Information:</strong>
      <table className="table table-bordered">
   
      <tbody>
  {Object.entries(specs[0] || {}).map(([key, value], index, arr) => {
    if (key === '__typename' || key === 'productId') {
      return null;
    }

    if (Array.isArray(value)) {
      value = value.filter(item => item !== 0);
      if (value.length === 0) {
        return null;
      }
      value = value.join(', ');
    } else if (value === 0) {
      return null;
    }

    let displayName = key.replace(/([a-z])([A-Z])/g, '$1 $2');
    if (key === 'RAMmemory') {
      displayName = 'RAM Memory';
    }

    const newRow = (title, className = '') => (
      <tr className={className}>
        <th colSpan="2" className="header-row">{title}</th>
      </tr>
    );

    const rowContent = () => {
      const units = {
        ScreenResolution: value => value.replace(/(\d+)\s*,\s*(\d+)/, '$1 x $2'),
        TotalStorageCapacity: value => `${value} GB`,
        ProductHeight: value => `${value} Inches`,
        ProductWidth: value => `${value} Inches`,
        ProductDepth: value => `${value} Inches`,
        ProductWeight: value => `${value} Pounds`,
        Warranty: value => `${value} ${value === 1 ? 'Year' : 'Years'}`,
        ScreenSize: value => `${value} Inches`,
        FrontFacingCamera: value => `${value} Pixels Vertical Resolution`,
      };
    
      if (units.hasOwnProperty(key)) {
        value = units[key](value);
      }
    
      return (
        <tr key={key} className="offset-right">
          <th scope="row">{displayName}</th>
          <td>
            {key === 'RAMmemory' ? `${value} GB` : value}
          </td>
        </tr>
      );
    };
    

    const shouldDisplay = (key1, key2) => {
      const specsArray = Object.keys(specs[0] || {});
      const bothExist = specsArray.includes(key1) && specsArray.includes(key2);
      return bothExist && (specs[0][key1] !== 0 || specs[0][key2] !== 0);
    };

    const cameraRow = () => {
      if (key === 'FrontFacingCamera' || key === 'RearFacingCamera') {
        const displayCamera = specs[0]['FrontFacingCamera'] !== 0 || specs[0]['RearFacingCamera'] !== 0;
        if (displayCamera && key === 'FrontFacingCamera') {
          return newRow('CAMERA', 'header-row');
        }
      }
      return null;
    };

    let nextKey = null;
    let prevKey = null;

    if (index < arr.length - 1) {
      nextKey = arr[index + 1][0];
    }

    if (index > 0) {
      prevKey = arr[index - 1][0];
    }

    switch (key) {
      case 'Color':
        return (
          <>
            {newRow('GENERAL', 'header-row')}
            {rowContent()}
          </>
        );
      case 'WirelessConnectivity':
        return (
          <>
            {newRow('CONNECTIVITY', 'header-row')}
            {rowContent()}
          </>
        );
        case 'ProductHeight':
          return (
            <>
              {newRow('DIMENSIONS', 'header-row')}
              {rowContent()}
            </>
          );
      case 'BluetoothVersion':
        return (
          <>
            {rowContent()}
            {cameraRow()}
          </>
        );
      case 'RAMmemory':
        return (
          <>
            {rowContent()}
            {shouldDisplay('RAMmemory', 'OperatingSystem') && newRow('CPU & OS', 'header-row')}
          </>
        );
      case 'StylusIncluded':
        return (
          <>
            {rowContent()}
            {specs[0]['BatteryLife'] !== 0 && newRow('BATTERY', 'header-row')}
          </>
        );
      case 'ProductWeight':
        return (
          <>
            {rowContent()}
            {shouldDisplay('ProductWeight', 'Warranty') && newRow('WARRANTY', 'header-row')}
          </>
        );
        case 'ScreenSize':
          if (specs[0][key] !== 0) {
            if (nextKey === 'DisplayType' || nextKey === undefined) {
              return (
                <>
                  {newRow('DISPLAY', 'header-row')}
                  {rowContent()}
                </>
              );
            } else if (nextKey) {
              return (
                <>
                  {newRow('DISPLAY', 'header-row', 'GENERAL', 'header-row')}
                  {rowContent()}
                </>
              );
            }
          } else {
            if (prevKey === 'DisplayType') {
              return (
                <>
                  {newRow('DISPLAY', 'header-row')}
                  {rowContent()}
                </>
              );
            } else {
              return rowContent();
            }
          }
          case 'TotalStorageCapacity':
        return (
          <>
            {newRow('MEMORY', 'header-row')}
            {rowContent()}
          </>
        );
        case 'DisplayType':
          if (specs[0]['ScreenSize'] === 0) {
            return (
              <>
                {newRow('DISPLAY', 'header-row' )}
                {rowContent()}
              </>
            );
          } else {
            return rowContent();
          }
      case 'RearFacingCamera':
        return (
          <>
            {rowContent()}
            {shouldDisplay('RearFacingCamera', 'Color')}
          </>
        );
      default:
        return (
          <>
            {cameraRow()}
            {rowContent()}
          </>
        );
    }
  })}
  </tbody>
  </table>
  </div>
  </div>
</div>


<div className="accordion-item">
  <h2 className="accordion-header" id="headingThree">
    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Compare Products
    </button>
  </h2>
  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <div className="accordion-body">
      <CompareProducts product={product} initialProductId={productId} />
    </div>
  </div>
</div>



</div>
    </div>
  );
};

export default ProductSlider;