import {
  CATEGORIES_QUERY,
  PRODUCTS_BY_BRANDS_BY_CATEGORY_QUERY,
} from "../../graphql/query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearFilters } from "../../features/products/productSlice";
import { useQuery } from "@apollo/client";
import useProtected from "../../hooks/useProtected";
import Brands from "../Brands/Brands";
import { Link } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { useSelector } from "react-redux";

const Categories = ({ category }) => {
  useProtected();

  const darkMode = useSelector((state) => state.darkMode)

  // const [selectedCategory, setSelectedCategory] = useState("");
  const { data, loading, error } = useQuery(CATEGORIES_QUERY, {
    fetchPolicy: "no-cache",
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) return <p>No data</p>;

  const { getCategories } = data;

  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.category === category) {
      // If the clicked category is already selected, deselect it
      setSelectedCategory(null);
    } else {
      // Otherwise, select the clicked category and set 'brandsClicked' to false
      setSelectedCategory({ category, brandsClicked: false });
    }
  };

  const handleBrandsClick = () => {
    setSelectedCategory({ ...selectedCategory, brandsClicked: true });
  };

  // const handleCategoryClick = (category) => {
  //   setSelectedCategory(category);
  // };

  return (
    <div>
      <div role="group" aria-label="Vertical button group">
      {getCategories.map((category) => {
  const isCategorySelected =
    selectedCategory && selectedCategory.category === category;

  const btnClass = isCategorySelected
    ? darkMode
      ? "border-top border-bottom btn btn-light btn-lg fw-bold text text-dark fs-6 px-2"
      : "border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
    : darkMode
    ? "border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
    : "border-top border-bottom btn btn-light btn-lg fw-bold text text-dark fs-6 px-2";
          return (
            <div key={category} style={{ width: "100%" }}>
              <button
                className={btnClass}
                style={{ width: "100%", color: "grey", borderRadius: 0, transition: "none" }}
                onMouseEnter={() => handleCategoryClick(category)}
              >
                <p className="text-start px-4 my-auto py-2">{category}</p>
              </button>
              {selectedCategory && selectedCategory.category === category && (
                <button
                  className={btnClass}
                  style={{ width: "100%", color: "grey", borderRadius: 0 }}
                  onMouseEnter={handleBrandsClick}
                >
                  Brands
                </button>
              )}
              {selectedCategory &&
                selectedCategory.category === category &&
                selectedCategory.brandsClicked && (
                  <div>
                    <div
                      style={{
                        backgroundColor: "#DCDCDC",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                        paddingLeft: "5px",
                      }}
                    >
                      <h2 style={{ fontSize: "20px" }}>
                        Brands for {selectedCategory.category}
                      </h2>
                    </div>
                    {selectedCategory.category && (
                      <Brands category={selectedCategory.category} />
                    )}
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Categories;
