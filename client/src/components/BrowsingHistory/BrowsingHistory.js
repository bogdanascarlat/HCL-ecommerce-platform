import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import './BrowsingHistory.css'
import { motion } from "framer-motion";
import ScrollableCarousel from "../ScrollableCarousel/ScrollableCarousel";
import Slider from "../../components/Slider/Slider"

const BrowsingHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const browsingHistory = JSON.parse(localStorage.getItem("browsingHistory")) || [];
    const groupedHistory = browsingHistory.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category] = [product, ...acc[category]]; // Reverse the order of products within each category
      return acc;
    }, {});
    setHistory(groupedHistory);
  }, []);
  
  

  return (
    <>
      <Navbar />
      <div>
        <h3 style={{marginTop: "20px"}}>Check your last viewed items</h3>
        {Object.keys(history).map((category) => (
          <div key={category} style={{marginTop: "20px", marginLeft: "20px", width: "100%"}}>
            <h4 style={{fontWeight: "bold"}}>{category}</h4>
           
            <div
        className="scrollable-container-history"
        style={{
          marginTop: "20px",
          marginLeft: "20px",
          display: "flex",
          overflow: "hidden",
          whiteSpace: "nowrap",
          justifyContent: "flex-start",
          alignItems: "center",
          position: "relative",
          width: "60%"
          
        }}
      >
        
        <Slider products={history[category]} />
</div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
  
  
  
};

export default BrowsingHistory;