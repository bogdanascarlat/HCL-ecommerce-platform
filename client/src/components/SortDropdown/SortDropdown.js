import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../graphql/query";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../features/products/productSlice";
import { clearFilters } from "../../features/products/productSlice";

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortClick = (sortBy) => {
    setSortBy(sortBy);
    toggleDropdown();
  };

  const { data, loading, error } = useQuery(GET_ITEMS, {
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let products = data.getAllProducts;
  let sortedProducts = [...products];
  console.log(products);

  if (sortBy === "lowestPrice") {
    console.log("sorting by lowest price");
    products = [...products].sort((a, b) => a.price - b.price);
  } else if (sortBy === "highestPrice") {
    console.log("sorting by highest price");
    products = [...products].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="dropdown" style={{ marginLeft: 3 + "em" }}>
      <button
        className="btn btn-secondary dropdown-toggle"
        onClick={toggleDropdown}
      >
        Sort
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          <button
            className={`dropdown-item ${
              sortBy === "lowestPrice" ? "active" : ""
            }`}
            onClick={() => handleSortClick("lowestPrice")}
          >
            Lowest to highest
          </button>
          <button
            className={`dropdown-item ${
              sortBy === "highestPrice" ? "active" : ""
            }`}
            onClick={() => handleSortClick("highestPrice")}
          >
            Highest to lowest
          </button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
