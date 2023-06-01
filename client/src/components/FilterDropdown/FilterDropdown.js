import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY, ALL_BRANDS_QUERY } from "../../graphql/query";
import { useDispatch } from "react-redux";
import { applyFilters } from "../../features/products/productSlice";
import { clearFilters } from "../../features/products/productSlice";

const FilterDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setShowCategories(false);
    setShowBrands(false);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
    setShowBrands(false);
  };

  const toggleBrands = () => {
    setShowBrands(!showBrands);
    setShowCategories(false);
  };

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.category === category) {
      setSelectedCategory(null);
      setSelectedBrand(null);
      dispatch(clearFilters());
    } else {
      setSelectedCategory({ category, brandsClicked: false });
      setSelectedBrand(null);
      dispatch(applyFilters({ byCategory: category, byBrand: null }));
    }
  };

  const handleBrandClick = (brand) => {
    if (selectedBrand === brand) {
      setSelectedBrand(null);
      dispatch(
        applyFilters({
          byCategory: selectedCategory?.category || null,
          byBrand: null,
        })
      );
    } else {
      setSelectedBrand(brand);
      dispatch(
        applyFilters({
          byCategory: selectedCategory?.category || null,
          byBrand: brand,
        })
      );
    }
  };

  const { data, loading, error } = useQuery(CATEGORIES_QUERY, {
    fetchPolicy: "no-cache",
  });

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(ALL_BRANDS_QUERY, {
    fetchPolicy: "no-cache",
  });

  if (loading || loading2) {
    return <p>Loading...</p>;
  }

  if (error || error2) {
    return (
      <p>Error: {(error && error.message) || (error2 && error2.message)}</p>
    );
  }

  const { getCategories } = data;
  const getBrands = data2?.getBrands || [];
  const filteredBrands = getBrands.filter(
    (brand) => brand.category === selectedCategory?.category
  );

  const brandsToDisplay = selectedCategory ? filteredBrands : getBrands;
  return (
    <div className="dropdown" style={{ marginLeft: 3 + "em" }}>
      <button
        className="btn btn-secondary dropdown-toggle"
        onClick={toggleDropdown}
      >
        Filter
      </button>
      {isOpen && (
        <div className="dropdown-menu show">
          <button className="dropdown-item" onClick={toggleCategories}>
            Filter by category
          </button>
          {showCategories && (
            <div className="dropdown-menu show">
              {getCategories.map((category) => (
                <button
                  key={category}
                  className={`dropdown-item ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          <button className="dropdown-item" onClick={toggleBrands}>
            Filter by brand
          </button>
          {showBrands && (
            <div className="dropdown-menu show">
              {brandsToDisplay.map((brand, index) => (
                <button
                  key={`${brand}_${index}`}
                  className={`dropdown-item ${
                    selectedBrand === brand ? "active" : ""
                  }`}
                  onClick={() => handleBrandClick(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
