import React, { useState } from "react";
import PriceSlider from "../PriceSlider/PriceSlider";
import useProtected from "../../hooks/useProtected";
import SortDropdown from "../SortDropdown/SortDropdown";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import './SwitchBar.css'

const MIN_PRICE = 0;
const MAX_PRICE = 10000;



const SwitchBar = ({
  setProductsPerPage,
  onPriceChange,
  setCurrentPage,
  priceRange,
  handlePriceChange,
}) => {
  useProtected();


  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode)
  const getSwitchBarColor = () => (darkMode ? "#232c31" : "#f8f9fa")
  const getTextColor = () => (darkMode ? "white" : "black")

  return (
    <div
      className="navbar mb-1 w-100"
      style={{ maxHeight: "60px", borderRadius: "10px", backgroundColor: getSwitchBarColor(),  }}
    >
      <div className="d-flex column align-items-center">
        <span className="ms-3">
          <label htmlFor="productsPerPage">Products per page</label>
        </span>
        <span className="ms-3">
          <select
            id="productsPerPage"
            defaultValue={20}
            className="form-select"
            style={{backgroundColor:getSwitchBarColor(), color:getTextColor()}}
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
        <span style={{ marginLeft: "30px" }}>
            <SortDropdown classes={"nav-item dropdown"} />
        </span>
      </div>
    </div>
  );
};

export default SwitchBar;
