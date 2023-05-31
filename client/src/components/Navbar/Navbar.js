import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyFilters } from "../../features/products/productSlice";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import SortDropdown from "../SortDropdown/SortDropdown";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import './Navbar.css'
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

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
  const darkMode = useSelector((state) => state.darkMode);
  const getIconsColor = () => (darkMode ? "white" : "black")
  const svgColorStyle = {
    color: getIconsColor(),
    transition: "color 0.2s ",
  };

 

  return (
    <>
      <motion.li
  className="lala"
  style={{
    background: "transparent",
    border: 'none',
    transition: 'background-color 0.1s'
  }}
  variants={container}
  initial="hidden"
  animate="visible"
  whileHover={{
    scale: 1.1,
    background: "rgba(10, 0, 0, 0.3)",
    transition: { duration: 0.1 }
  }}
>
        <Link to="/cart" className="nav-link ms-1">
          <svg
            style={svgColorStyle}
            className="pe-1 "
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill='currentColor'
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          {cart && cart.length > 0 && (
            <span
              style={{ fontSize: ".65em" }}
              className="position-absolute top-1 mt-1 translate-middle badge rounded-pill bg-danger"
            >
              {cart.length}
            </span>
          )}
        </Link>
        <Link to="/cart" className="nav-link ms-1">
          Cart
        </Link>
        </motion.li>
      <motion.li
  className="lala"
  style={{
    background: "transparent",
    border: 'none',
    transition: 'background-color 0.1s'
  }}
  variants={container}
  initial="hidden"
  animate="visible"
  whileHover={{
    scale: 1.1,
    background: "rgba(10, 0, 0, 0.3)",
    transition: { duration: 0.1 }
  }}
>
  <Link to="/wishlist" className="nav-link ms-1" >
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
</motion.li>

<motion.li
  className="lala"
  style={{
    background: "transparent",
    border: 'none',
    transition: 'background-color 0.1s'
  }}
  variants={container}
  initial="hidden"
  animate="visible"
  whileHover={{
    scale: 1.1,
    background: "rgba(10, 0, 0, 0.3)",
    transition: { duration: 0.1 }
  }}
>
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
        </motion.li>
      
        <DarkModeToggle />
      
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
  const darkMode = useSelector((state) => state.darkMode);
  const getNavbarColor = () => (darkMode ? "#1d252a" : "#f8f9fa");
  const getLogoColor = () => (darkMode ? "white" : "#006cb7");
  


  return (
    <>
     <nav
        className="navbar-top navbar-expand-lg  py-4 d-flex justify-content-around align-items-center sticky-top"
        style={{ backgroundColor: getNavbarColor(), transition: 'background-color 0.3s' }}
      >
        <div>
          <Link to="/">
            <svg width="100pt" height="18pt" viewBox="0 0 986 148" version="1.1" xmlns="http://www.w3.org/2000/svg">
<g id="#006cb7ff">
<path fill={getLogoColor()} opacity="1.00" d=" M 488.93 11.36 C 537.62 1.59 587.88 1.74 637.05 7.61 C 657.37 10.25 678.52 12.92 696.43 23.65 C 706.89 29.71 714.98 40.72 715.36 53.09 C 681.84 53.78 648.32 53.43 614.81 53.33 C 604.80 41.64 588.80 37.98 574.07 37.31 C 554.33 36.65 533.81 38.14 515.73 46.74 C 500.45 53.98 487.34 67.39 483.30 84.14 C 481.33 91.77 486.26 99.66 492.96 103.11 C 505.91 109.72 520.76 110.49 535.02 111.02 C 553.68 111.77 573.12 108.28 588.96 97.93 C 590.53 97.04 591.90 95.35 593.90 95.60 C 627.79 95.48 661.69 95.53 695.58 95.68 C 683.91 108.74 668.39 117.71 652.23 124.05 C 631.97 132.01 610.45 136.19 588.95 139.06 C 565.09 141.90 541.06 143.65 517.03 143.30 C 484.52 143.12 451.64 141.01 420.28 131.91 C 405.82 127.40 391.23 120.49 381.80 108.19 C 373.94 98.44 372.84 84.27 377.99 73.02 C 384.67 58.22 397.74 47.52 411.45 39.46 C 435.40 25.69 461.94 16.90 488.93 11.36 Z"/>
<path fill={getLogoColor()} opacity="1.00" d=" M 62.45 8.22 C 97.68 7.65 132.92 8.55 168.16 8.41 C 161.68 23.04 155.10 37.64 148.60 52.27 C 182.89 52.33 217.18 52.15 251.47 52.36 C 258.18 37.78 264.43 22.97 271.15 8.39 C 307.36 8.35 343.56 8.26 379.77 8.40 C 360.12 51.82 340.55 95.26 320.99 138.72 C 290.66 139.38 260.32 138.98 229.99 139.07 C 224.25 139.13 218.49 139.26 212.80 138.46 C 220.82 121.40 228.39 104.13 236.10 86.94 C 201.71 86.93 167.31 86.93 132.92 86.93 C 125.46 104.17 117.76 121.31 110.54 138.64 C 74.90 139.40 39.26 139.11 3.62 138.91 C 22.94 95.21 43.01 51.85 62.45 8.22 Z"/>
<path fill={getLogoColor()} opacity="1.00" d=" M 766.16 8.00 C 802.57 8.00 838.99 8.00 875.40 8.00 C 860.65 41.08 845.81 74.11 830.91 107.13 C 881.09 107.16 931.28 107.28 981.46 107.27 C 976.69 117.85 971.93 128.43 967.15 139.00 C 880.62 139.07 794.09 139.09 707.57 138.99 C 726.86 95.22 746.58 51.64 766.16 8.00 Z"/>
</g>
</svg>
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

<motion.button
  className="lala"
  style={{
    background: "transparent",
    border: 'none',
    transition: 'background-color 0.1s'
  }}
  variants={container}
  initial="hidden"
  animate="visible"
  whileHover={{
    scale: 1.1,
    background: "rgba(10, 0, 0, 0.3)",
    transition: { duration: 0.1 }
  }}
>
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="black"
              
              
            >
              <path d="M21.414,18.586c-0.287-0.287-1.942-1.942-2.801-2.801c-0.719,1.142-1.686,2.109-2.828,2.828 c0.859,0.859,2.514,2.514,2.801,2.801c0.781,0.781,2.047,0.781,2.828,0C22.195,20.633,22.195,19.367,21.414,18.586z"></path>
              <circle cx="11" cy="11" r="9" fill="#c0c0c0"></circle>
            </svg>
           
          </motion.button>

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
