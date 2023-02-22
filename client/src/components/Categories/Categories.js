import { CATEGORIES_QUERY, BRANDS_QUERY } from "../../graphql/query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  clearFilters,
} from "../../features/products/productSlice";
import { useQuery } from "@apollo/client";
import useProtected from "../../hooks/useProtected";
import Brands from "../Brands/Brands";

const Categories = () => {
  useProtected();

  const { data, loading, error } = useQuery(CATEGORIES_QUERY, {
    fetchPolicy: "no-cache",
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [brandsVisible, setBrandsVisible] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
  }, []);

  if (loading || error) return <p>No data</p>;

  const { getCategories } = data;

  const toggleBrands = () => {
    setBrandsVisible((prev) => !prev);
  };

  const showCategory = (category) => {
    setSelectedCategory(category);
    setBrandsVisible(false);
    setDisplayedCategories([category]);
  };

  const hideBrands = () => {
    setSelectedCategory(null);
    setBrandsVisible(false);
    setDisplayedCategories([]);
  };

  const hideCategories = () => {
    setSelectedCategory(null);
    setBrandsVisible(false);
    setDisplayedCategories([]);
  };

  return (
    <div>
      <div role="group" aria-label="Vertical button group">
        {getCategories.map((category) => {
          const btnClass =
            selectedCategory === category
              ? "border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
              : "border-top border-bottom btn btn-light btn-lg fw-bold fs-6 px-2";
          return (
            <div key={category} style={{ width: "100%" }}>
              {showCategory && (
                <>
                  <button
                    className={btnClass}
                    style={{ width: "100%", color: "grey", borderRadius: 0 }}
                    onClick={() => toggleBrands()}
                  >
                    <p className="text-start px-4 my-auto py-2">{category}</p>
                  </button>
                  {selectedCategory === category && (
                    <button
                      className="btn btn-primary"
                      onClick={() => toggleBrands()}
                      style={{ marginLeft: "10px" }}
                    >
                      Brands
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })}
        {showCategory && (
          <div style={{ marginTop: "10px" }}>
            <h2>Here are your results</h2>
            {brandsVisible && <Brands category={selectedCategory} />}

            <button className="btn btn-secondary" onClick={() => hideBrands()}>
              Hide results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;
