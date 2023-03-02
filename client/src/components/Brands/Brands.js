import {
  BRANDS_QUERY,
  PRODUCTS_BY_BRANDS_BY_CATEGORY_QUERY,
} from "../../graphql/query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  clearFilters,
} from "../../features/products/productSlice";
import { useQuery } from "@apollo/client";
import useProtected from "../../hooks/useProtected";
import { useParams } from "react-router-dom";
import ProductsList from "../ProductsList/ProductsList";

const Brands = ({ category }) => {
  useProtected();

  const { data, loading, error } = useQuery(BRANDS_QUERY, {
    variables: { category },
  });

  const [selectedBrand, setSelectedBrand] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    console.log("Loading...");
  }

  if (error) {
    console.log(`Error: ${error.message}`);
  }

  if (!data) {
    return <p>No data</p>;
  }

  const { getBrandsByCategory } = data;
  console.log(data);

  return (
    <div role="group" aria-label="Vertical button group">
      {getBrandsByCategory.map((brand) => {
        const btnClass =
          selectedBrand === brand
            ? " border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
            : "border-top border-bottom btn btn-light btn-lg fw-bold fs-6 px-2";
        return (
          <div key={brand.id} style={{ width: "100%" }}>
            <button
              className={btnClass}
              style={{ width: "100%", color: "black", borderRadius: 0 }}
              onClick={() => {
                console.log(
                  `Brand ${brand.name} clicked ${selectedBrand} ${category} ${brand}`
                );
                setSelectedBrand(
                  brand.name === selectedBrand ? null : brand.name
                );
                dispatch(
                  applyFilters({ byCategory: category, byBrand: brand.name })
                );
              }}
            >
              <p className="my-auto" style={{ textAlign: "center" }}>
                {brand.name}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Brands;

// return (
//   <>
//     <h2>{category}</h2>
//     <ul>
//       {Object.keys(productsByBrandsByCategory[category]).map((brand) => (
//         <li
//           key={brand}
//           className={brand === selectedBrand ? "active" : ""}
//           onClick={() => handleBrandClick(brand)}
//         >
//           {brand}
//         </li>
//       ))}
//     </ul>
//     {selectedBrand && (
//       <ProductsList
//         products={productsByBrandsByCategory[category][selectedBrand]}
//       />
//     )}
//   </>
// );
