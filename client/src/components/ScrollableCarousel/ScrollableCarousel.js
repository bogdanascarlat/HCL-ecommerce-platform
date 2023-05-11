import React from "react";
import { motion } from "framer-motion";

const ScrollableCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handlePrev} style={{ position: "absolute", left: 0, zIndex: 10 }}>
        {"<"}
      </button>
      <button onClick={handleNext} style={{ position: "absolute", right: 0, zIndex: 10 }}>
        {">"}
      </button>
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
          const isCenter = index === currentIndex;
          return (
            <motion.div
              key={product.id}
              className="scrollable-item"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 16px",
                opacity: isCenter ? 1 : 0.5,
                zIndex: isCenter ? 1 : 0,
              }}
              animate={{
                x: `-${currentIndex * 100}%`,
                scale: isCenter ? 1 : 0.5,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
              <a href={`/product/${product.id}`}>
                <div className="text-center">
                <img
  src={product.images[0]}
  alt={product.title}
  className="d-block mx-auto"
  style={{ maxHeight: "200px", objectFit: "cover", cursor: "pointer" }}
/>

                  <div className="mt-2">
                    <h6>{product.title}</h6>
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollableCarousel;
