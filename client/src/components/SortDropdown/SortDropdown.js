import React, { useState } from "react";
import { useContext } from "react";
import SortingContext from "./SortContext";

const SortDropdown = () => {
  const { sortBy, setSortBy } = useContext(SortingContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortClick = (sortBy) => {
    setSortBy(sortBy);
    toggleDropdown();
  };

  return (
    <div className="dropdown" style={{ marginLeft: 3 + "em" }}>
      <button
        className="btn dropdown-toggle"
        onClick={toggleDropdown}
      >
        Sort by price
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
