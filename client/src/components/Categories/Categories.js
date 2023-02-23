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
  const [displayedCategories, setDisplayedCategories] = useState(true);
  const [displayedBrands, setDisplayedBrands] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
  }, []);

  if (loading || error) return <p>No data</p>;

  const { getCategories } = data;
  console.log(data);

  // const hideBrands = () => {
  //   setDisplayedBrands(false);
  // };

  // const handleCategoryClick = (category) => {
  //   if (selectedCategory === category) {
  //     setSelectedCategory(null);
  //     hideBrands();
  //   } else {
  //     setSelectedCategory(category);
  //     setDisplayedCategories(false);
  //     hideBrands();
  //   }
  // };

  // const handleBrandsClick = () => {
  //   setDisplayedBrands(!displayedBrands);
  // };

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

  // return (
  //   <div>
  //     <div role="group" aria-label="Vertical button group">
  //       {getCategories.map((category) => {
  //         const btnClass =
  //           selectedCategory === category
  //             ? "border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
  //             : "border-top border-bottom btn btn-light btn-lg fw-bold fs-6 px-2";
  //         return (
  //           <div key={category} style={{ width: "100%" }}>
  //             <button
  //               className={btnClass}
  //               style={{ width: "100%", color: "grey", borderRadius: 0 }}
  //               onClick={() => handleCategoryClick(category)}
  //             >
  //               <p className="text-start px-4 my-auto py-2">{category}</p>
  //             </button>
  //             {selectedCategory === category && (
  //               <button
  //                 className="btn btn-primary"
  //                 onClick={() => handleBrandsClick()}
  //                 style={{ marginLeft: "10px" }}
  //               >
  //                 Brands
  //               </button>
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //     {!displayedCategories && (
  //       <div style={{ marginTop: "10px" }}>
  //         <h2>Brands for {selectedCategory}</h2>
  //         {displayedBrands && <Brands category={selectedCategory} />}
  //       </div>
  //     )}
  //   </div>
  // );

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
                  <div style={{ marginTop: "10px" }}>
                    <h2>Brands for {selectedCategory.category}</h2>
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
