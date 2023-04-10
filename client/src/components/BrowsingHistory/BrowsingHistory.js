import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import './BrowsingHistory.css'
import { motion } from "framer-motion";

const BrowsingHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const browsingHistory = JSON.parse(localStorage.getItem("browsingHistory")) || [];
    setHistory(browsingHistory);
  }, []);

  return (
    <>
    <Navbar />
    <div>
  <h3>Browsing History</h3>
  <ul>
    {history.map((product) => (
      <li key={product.id}>
        <div className="product-container">
          <a href={`/product/${product.id}`}>{product.title}</a>
          <motion.div
          className="container1"
          key={product.images[0]}
          initial={{ scale: 0 }}
          animate={{
            rotate: 180,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
            <img
              key={product.images[0]}
              src={product.images[0]}
              alt={product.images[0]}
              className="product-image"
              style={{ maxHeight: 120,  cursor: "pointer" }}
            />
        </motion.div>
        </div>
      </li>
    ))}
  </ul>
</div>


    <Footer />
    </>
  );
};

export default BrowsingHistory;
