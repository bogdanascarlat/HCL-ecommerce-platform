import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../features/products/productSlice";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import SortDropdown from "../SortDropdown/SortDropdown";

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
  const cart = useSelector((state) => state?.auth?.loggedInUser?.cart);

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
      <li className={classes}>
        <Link to="/history" className="nav-link">
          <svg
            fill="#000000"
            height="24"
            width="24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-28.49 -28.49 276.13 276.13"
          >
            <path d="M109.575,0C49.156,0,0.001,49.155,0.001,109.574c0,60.42,49.154,109.576,109.573,109.576 c60.42,0,109.574-49.156,109.574-109.576C219.149,49.155,169.995,0,109.575,0z M109.575,204.15 c-52.148,0-94.573-42.427-94.573-94.576C15.001,57.426,57.427,15,109.575,15c52.148,0,94.574,42.426,94.574,94.574 C204.149,161.724,161.723,204.15,109.575,204.15z"></path>{" "}
            <path d="M166.112,108.111h-52.051V51.249c0-4.142-3.357-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v64.362c0,4.142,3.358,7.5,7.5,7.5 h59.551c4.143,0,7.5-3.358,7.5-7.5C173.612,111.469,170.254,108.111,166.112,108.111z"></path>{" "}
          </svg>
          History
        </Link>
      </li>
    </>
  );
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

        <h5>Filter</h5>

        <ul className="navbar-nav flex-grow-1 pe-3 dropdown-menu-dark">
          {<FilterDropdown classes={"nav-link fw-bold dropdown-item px-3"} />}
        </ul>

        <h5>Sort by price</h5>
        <ul className="navbar-nav flex-grow-1 pe-3 dropdown-menu-dark">
          {<SortDropdown classes={"nav-link fw-bold dropdown-item px-3"} />}
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

        <div className="d-flex" tabIndex="-1">
          <input
            className="form-control ms-5 me-2"
            type="search"
            placeholder="Search"
            onChange={(event) => {
              debounce(() => {
                dispatch(
                  applyFilters({
                    byTitle: event.target.value || null,
                    byCategoryKeyword: event.target.value || null,
                    byDescriptionKeyword: event.target.value || null,
                    byKeyword: event.target.value || null,
                  })
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

          <ul className="navbar-nav collapse navbar-collapse">
            <FilterDropdown classes={"nav-item dropdown"} />
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
