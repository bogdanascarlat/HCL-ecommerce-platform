import { GET_ITEMS, BRANDS_QUERY } from "../../graphql/query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  clearFilters,
} from "../../features/products/productSlice";
import { useQuery } from "@apollo/client";
import useProtected from "../../hooks/useProtected";

const Brands = () => {
  useProtected();

  const { data, loading, error } = useQuery(BRANDS_QUERY, {
    fetchPolicy: "no-cache",
  });

  const selectedBrand =
    useSelector((state) => state.products.filter.byBrand) || "";

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearFilters());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) return <p>No data</p>;

  const { getBrands } = data;
  console.log(data);

  return (
    <div role="group" aria-label="Vertical button group">
      {getBrands.map((brand) => {
        const btnClass =
          selectedBrand === brand
            ? " border-top border-bottom btn btn-dark btn-lg fw-bold text text-white fs-6 px-2"
            : "border-top border-bottom btn btn-light btn-lg fw-bold fs-6 px-2";
        return (
          <div key={brand} style={{ width: "100%" }}>
            <button
              className={btnClass}
              style={{ width: "100%", color: "grey", borderRadius: 0 }}
              onClick={() => {
                brand === selectedBrand
                  ? dispatch(applyFilters({ byBrand: null }))
                  : dispatch(applyFilters({ byBrand: brand }));
              }}
            >
              <p className="text-start px-4 my-auto py-2">{brand}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Brands;
