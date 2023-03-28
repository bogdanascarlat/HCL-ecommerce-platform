<<<<<<< HEAD
import React from "react";

const SwitchBar = ({ setProductsPerPage }) => {
  return (
    <nav
=======
import React, { useState } from "react";
import PriceSlider from "../PriceSlider/PriceSlider";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const SwitchBar = ({
  setProductsPerPage,
  onPriceChange,
  setCurrentPage,
  priceRange,
  handlePriceChange,
}) => {
  return (
    <div
>>>>>>> feature/slider-filter-dropdown
      className="navbar navbar-light bg-light mb-3 w-100"
      style={{ maxHeight: "60px", borderRadius: "10px" }}
    >
      <div className="d-flex column align-items-center">
        <span className="ms-3">
<<<<<<< HEAD
          <label>Products per page</label>
        </span>
        <span className="ms-3">
          <select
=======
          <label htmlFor="productsPerPage">Products per page</label>
        </span>
        <span className="ms-3">
          <select
            id="productsPerPage"
>>>>>>> feature/slider-filter-dropdown
            defaultValue={20}
            className="form-select"
            aria-label="Default select example"
            onChange={(e) =>
              setProductsPerPage(Number.parseInt(e.target.value))
            }
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="99999">All</option>
          </select>
        </span>
<<<<<<< HEAD
      </div>
    </nav>
=======
        <span style={{ marginLeft: "100px" }}>
          <label htmlFor="priceSlider">Price slider</label>
        </span>
        <span style={{ marginLeft: "30px" }}>
          <PriceSlider
            id="priceSlider"
            min={MIN_PRICE}
            max={MAX_PRICE}
            onPriceChange={handlePriceChange}
            value={priceRange}
          />
        </span>
      </div>
    </div>
>>>>>>> feature/slider-filter-dropdown
  );
};

export default SwitchBar;
