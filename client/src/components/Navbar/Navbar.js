import React from "react";
import { useQuery } from "@apollo/client";
import { CATEGORIES_QUERY, BRANDS_QUERY } from "../../graphql/query";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../features/products/productSlice";

//Create debounce helper function
let clock;

const debounce = (func) => {
  if (clock) {
    clearTimeout(clock);
  }
  clock = setTimeout(() => {
    func();
  }, 500);
};

const MenuItems = ({ classes }) => {
  const cart = useSelector((state) => state?.auth?.logedInUser?.cart);

  return (
    <>
      <li className={classes + " d-flex"}>
        <Link to="/cart" className="nav-link position-relative pe-2">
          <svg
            className="pe-1 "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {cart && cart.length > 0 && (
            <span
              style={{ fontSize: ".65em" }}
              className="position-absolute top-0 mt-1 translate-middle badge rounded-pill bg-danger"
            >
              {cart.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className="nav-link ms-1">
          Cart
        </Link>
      </li>
      <li className={classes}>
        <Link to="/wishlist" className="nav-link">
          <svg
            className="pe-1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />{" "}
          </svg>
          Wish List
        </Link>
      </li>
      <li className={classes}>
        <Link to="/profile" className="nav-link">
          <svg
            className="pe-1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
          </svg>
          Profile
        </Link>
      </li>
    </>
  );
};

const Categories = ({ classes }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(CATEGORIES_QUERY);

  if (loading) return "Loading...";

  if (error) return "Error...";

  const { getCategories } = data;

  return getCategories.map((category) => (
    <li key={category} className="nav-item">
      <button
        onClick={() => dispatch(applyFilters({ byCategory: category }))}
        className={classes}
        to=""
      >
        {category}
      </button>
    </li>
  ));
};

const Brands = ({ classes }) => {
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(BRANDS_QUERY);

  if (loading) return "Loading...";

  if (error) return "Error...";

  const { getBrands } = data;
  console.log(data);

  return getBrands.map((brand) => (
    <li key={brand} className="nav-item">
      <button
        onClick={() => dispatch(applyFilters({ byBrand: brand }))}
        className={classes}
        to=""
      >
        {brand}
      </button>
    </li>
  ));
};

const OffCanvas = () => {
  return (
    <div
      style={{ maxWidth: "50%" }}
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex="-1"
      id="navbarSupportedContent"
      aria-labelledby="offcanvasDarkNavbarLabel"
    >
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
          Menu
        </h4>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div className="offcanvas-body">
        <h5>Actions</h5>

        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 dropdown-menu-dark">
          {<MenuItems classes={"nav-item fw-bold dropdown-item px-3"} />}
        </ul>

        <br />

        <h5>Categories</h5>

        <ul className="navbar-nav flex-grow-1 pe-3 dropdown-menu-dark">
          {<Categories classes={"nav-link fw-bold dropdown-item px-3"} />}
        </ul>
      </div>
    </div>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-4 d-flex justify-content-around align-items-center sticky-top">
        <div>
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/8a/HCL_Technologies_logo.svg"
              style={{ maxWidth: 150 }}
              alt="logo"
            />
          </Link>
        </div>

        {/* Search bar starts*/}
        <div className="d-flex" tabIndex="-1">
          <input
            className="form-control ms-5 me-2"
            type="search"
            placeholder="Search"
            onChange={(event) => {
              debounce(() => {
                dispatch(
                  applyFilters(
                    { byTitle: event.target.value || null } && {
                        byCategoryKeyword: event.target.value || null,
                      } && {
                        byDescriptionKeyword: event.target.value || null,
                      } && {
                        byKeyword: event.target.value || null,
                      }
                  )
                );
              });
            }}
          />

          <button className="btn btn-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="26"
              height="26"
              viewBox="0 0 24 24"
            >
              <path d="M21.414,18.586c-0.287-0.287-1.942-1.942-2.801-2.801c-0.719,1.142-1.686,2.109-2.828,2.828 c0.859,0.859,2.514,2.514,2.801,2.801c0.781,0.781,2.047,0.781,2.828,0C22.195,20.633,22.195,19.367,21.414,18.586z"></path>
              <circle cx="11" cy="11" r="9" opacity=".35"></circle>
            </svg>
          </button>
          {/* Search bar ends*/}

          <ul className="navbar-nav collapse navbar-collapse">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-light"
                href="#"
                id="navbarDarkDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark text-center"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <Categories classes={"dropdown-item fw-bold text-start px-3"} />
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <div className="collapse navbar-collapse">
            {<MenuItems classes={"btn btn-light"} />}
          </div>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </nav>
      <OffCanvas />
    </>
  );
};
export default Navbar;
