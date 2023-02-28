import { BRANDS_QUERY } from "../../graphql/query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  clearFilters,
} from "../../features/products/productSlice";
import { useQuery } from "@apollo/client";
import useProtected from "../../hooks/useProtected";
import { useParams } from "react-router-dom";

const Brands = ({ category }) => {
  const { data, loading, error } = useQuery(BRANDS_QUERY, {
    variables: { category },
  });

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

  return (
    <ul>
      {getBrandsByCategory.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default Brands;
