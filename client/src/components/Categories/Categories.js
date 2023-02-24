import { CATEGORIES_QUERY } from "../../graphql/query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearFilters } from "../../features/products/productSlice";
import { useQuery } from "@apollo/client";
import useProtected from "../../hooks/useProtected";
import Brands from "../Brands/Brands";

const Categories = () => {
  useProtected();

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
  console.log(data);

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

  return (
    <div>
      <div role="group" aria-label="Vertical button group">
        {getCategories.map((category) => {
          const btnClass =
            selectedCategory && selectedCategory.category === category
              ? "border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
              : "border-top border-bottom btn btn-light btn-lg fw-bold fs-6 px-2";
          return (
            <div key={category} style={{ width: "100%" }}>
              <button
                className={btnClass}
                style={{ width: "100%", color: "grey", borderRadius: 0 }}
                onClick={() => handleCategoryClick(category)}
              >
                <p className="text-start px-4 my-auto py-2">{category}</p>
              </button>
              {selectedCategory && selectedCategory.category === category && (
                <button
                  className={btnClass}
                  style={{ width: "100%", color: "grey", borderRadius: 0 }}
                  onClick={handleBrandsClick}
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
                    <Brands category={selectedCategory.category} />
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
