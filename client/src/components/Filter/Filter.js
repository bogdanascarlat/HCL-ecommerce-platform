import React, { useState } from "react";

import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY, BRANDS_QUERY } from "./queries";

function FilterDropdown() {
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [showByPrice, setShowByPrice] = useState(false);

  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(CATEGORIES_QUERY);
  const {
    loading: brandsLoading,
    error: brandsError,
    data: brandsData,
  } = useQuery(BRANDS_QUERY);

  const handleCategoriesClick = () => {
    setShowCategories(!showCategories);
    setShowBrands(false);
    setShowByPrice(false);
  };

  const handleBrandsClick = () => {
    setShowBrands(!showBrands);
    setShowCategories(false);
    setShowByPrice(false);
  };

  const handleByPriceClick = () => {
    setShowByPrice(!showByPrice);
    setShowCategories(false);
    setShowBrands(false);
  };

  const handleSubmenuClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ul className="navbar-nav collapse navbar-collapse">
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle btn btn-light"
          href="#"
          id="navbarDarkDropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
        </button>
        <ul
          className="dropdown-menu dropdown-menu-dark text-center"
          aria-labelledby="navbarDarkDropdownMenuLink"
        >
          <li className="dropdown-item">
            <button className="btn btn-link" onClick={handleCategoriesClick}>
              Categories
            </button>
            {showCategories && (
              <ul className="list-unstyled" onClick={handleSubmenuClick}>
                {categoriesData.getCategories.map((category) => (
                  <li key={category}>
                    <button className="btn btn-link">{category}</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="dropdown-item">
            <button className="btn btn-link" onClick={handleBrandsClick}>
              Brands
            </button>
            {showBrands && (
              <ul className="list-unstyled" onClick={handleSubmenuClick}>
                {brandsData.getBrandsByCategory.map((brand) => (
                  <li key={brand.id}>
                    <button className="btn btn-link">{brand.name}</button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="dropdown-item">
            <button className="btn btn-link" onClick={handleByPriceClick}>
              By Price
            </button>
            {showByPrice && (
              <ul className="list-unstyled" onClick={handleSubmenuClick}>
                <li>
                  <button className="btn btn-link">Descendent prices</button>
                </li>
                <li>
                  <button className="btn btn-link">Ascendent prices</button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default FilterDropdown;
