import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Slider.css";


const Slider = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [adjust, setAdjust] = useState(0);

  const handlePrev = () => {
    if (currentIndex > -1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const itemWidth = 350; // set a fixed width for each item
  const marginRight = 10; // set a margin between items

  useEffect(() => {
    const handleResize = () => {
      const screenPadding = 20  
      const maxWidth = window.screen.width-screenPadding;
      const currentWidth = window.innerWidth;
      const difference = maxWidth - currentWidth;
      setAdjust(difference);
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Call the handler initially to set the initial adjust value
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

  return (
    <div>
      <div>
        <button className="btn-left" onClick={handlePrev}>
          {"<"}
        </button>
        <button className="btn-right" onClick={handleNext}>
          {">"}
        </button>
      </div>
      <div style={{ position: "relative" }}>
        <div
          className="scrollable-container"
          style={{
            display: "flex",
            overflow: "hidden",
            whiteSpace: "nowrap",
            justifyContent: "flex-start",
            alignItems: "center",
            position: "relative",
          }}
        >
          {products.map((product, index) => {
            const isCenter = index - 1 === currentIndex;
            return (
              <motion.div
                key={product.id}
                className="scrollable-item"
                initial={{ scale: 0, rotation: -180 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: itemWidth,
                  marginRight,
                  opacity: isCenter ? 1 : 0.5,
                  zIndex: isCenter ? 1 : 0,
                  backgroundColor: "white",
                  borderRadius:"25px",
                  boxShadow: "0 0 12px white",
                  marginTop:"15px",
                  marginBottom:"15px",
                }}
                animate={{
                  rotate: 0,
                  x: `${(-currentIndex) * (itemWidth + marginRight) - (adjust/3.3)}px`,
                  scale: index - 1 === currentIndex ? 1 : 0.7,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.2 }}
              >
              <a href={`/product/${product.id}`} className="product-link">
  <div className="text-center">
    <img
      src={product.images[0]}
      alt={product.title}
      className="d-block mx-auto"
      style={{ maxHeight: "200px", objectFit: "cover", cursor: "pointer", marginTop:"8px", marginBottom:"8px" }}
    />

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h6 className="product-slider-title" style={{ marginRight: '5px' }}>{product.title}</h6>
    <h6 className="product-slider-title" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
  <span style={{ textDecoration: 'line-through' }}>${product.price}</span>
</h6>


    {product.discountPercentage ? (
      <span class="badge text-bg-danger" style={{ fontWeight: 'bold', fontSize: '12px', marginLeft: '5px' }}>
        SAVE {product.discountPercentage}%
      </span>
    ) : null}
     
  </div>
  <h5 className="card-title" style={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '10px', marginBottom:"5px" }}>
    Now: ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
  </h5>
 
</div>

  </div>
</a>


</motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
