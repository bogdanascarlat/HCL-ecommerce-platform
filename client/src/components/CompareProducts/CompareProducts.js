import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ITEMS } from '../../graphql/query';
import './CompareProducts.css'
import { motion } from "framer-motion";
import ReactSelect from 'react-select';
import { useNavigate } from "react-router-dom";


const CompareProducts = ({ initialProductId }) => {



  const [compareProducts, setCompareProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [motionVisible, setMotionVisible] = useState([false, false, false]);

  console.log(initialProductId);

  const { data } = useQuery(GET_ITEMS);

  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const preselectedProduct = data?.getAllProducts.find(
    (product) => product.id === initialProductId
  );
  const preselectedCategory = preselectedProduct?.category;

  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory);

  const uniqueCategories = Array.from(
    new Set(data?.getAllProducts.map((product) => product.category))
  );


  const filteredProductsByCategory = selectedCategory
    ? data?.getAllProducts.filter((product) => product.category === selectedCategory) || []
    : [];

  const filteredProducts = searchTerm
    ? filteredProductsByCategory.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : filteredProductsByCategory;


  useEffect(() => {
    if (preselectedCategory) {
      setSelectedCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  useEffect(() => {
    setCompareProducts([]);
  }, [selectedCategory]);

  const getInitialSelectValue = (index) => {
    return compareProducts[index] || '';
  };
  
  
  
  
  


  const setInitialState = () => {
    if (initialProductId && data?.getAllProducts) {
      setCompareProducts((prev) => {
        if (!prev.includes(initialProductId)) {
          return [initialProductId, ...prev];
        }
        return prev;
      });
      setMotionVisible((prev) => [true, ...prev.slice(1)]);
    }
  };
  

  useEffect(() => {
    setInitialState();
  }, []);

  const handleAddToCompare = (event, index) => {
    const productId = event.target.value;
    setCompareProducts((prevCompareProducts) => {
      const updatedCompareProducts = [...prevCompareProducts];
      updatedCompareProducts[index] = productId;
      return updatedCompareProducts.filter(
        (product, i) => i === index || product !== productId
      );
    });
    setMotionVisible((prev) =>
      prev.map((visible, i) =>
        i === index || (i === 1 && index === 2 && !prev[1]) ? true : visible
      )
    );
  };
  
  
  
  
  
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  const allSpecKeys = data?.getAllProducts[0]?.specs
    ? Object.keys(data.getAllProducts[0].specs).filter((key) => key !== 'productId' && key !== '__typename')
    : [];

  const getColumnClass = () => {
    const numberOfProducts = compareProducts.length;
    return numberOfProducts === 2 ? "two-columns" : "three-columns";
  };


  // set initial state for compareProducts
  useState(() => {
    if (initialProductId && filteredProducts.length > 0) {
      setCompareProducts([initialProductId, ...compareProducts]);
    }
  }, [initialProductId, filteredProducts]);



  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };


  return (
    <div className="compare-products">
      <h3>Compare Products</h3>
      <div className="compare-select mb-3">

      <div className="d-flex justify-content-end">
  <div className="select-wrapper category-select">
    <select
      onChange={handleCategoryChange}
      value={selectedCategory}
      className="form-select custom-select-spacing"
      style={{ width: "100%" }}
    >
      <option value="">Select a category</option>
      {uniqueCategories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
  {[0, 1, 2].map((index) => (
    <div key={index} className="select-wrapper" style={{display: selectedCategory ? 'block' : 'none'}}>
        <select
          onChange={(e) => handleAddToCompare(e, index)}
          value={getInitialSelectValue(index)}
          className="form-select custom-select-spacing"
          style={{ width: "100%" }}
        >
          <option className='option-select' value="">Add a product to compare</option>
          {filteredProducts.map((product) => (
            <option className='option-select'
              key={product.id}
              value={product.id}
              disabled={compareProducts.includes(product.id)}
            >
              {product.title}
            </option>
          ))}
        </select>
        <motion.div
          className="container1"
          key={compareProducts[index]}
          initial={{ scale: 0 }}
          animate={{
            rotate: 180,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {motionVisible[index] && compareProducts[index] && (
            <img
            onClick={() => handleProductClick(compareProducts[index])}
              key={compareProducts[index]}
              src={
                data.getAllProducts.find((p) => p.id === compareProducts[index])
                  .images[0]
              }
              alt={
                data.getAllProducts.find((p) => p.id === compareProducts[index])
                  .title
              }
              className="product-image"
              style={{ maxHeight: 120,  cursor: "pointer" }}
            />
          )}
        </motion.div>
        </div>
  ))}
  {!selectedCategory &&
    [0, 1, 2].map((index) => (
      <div key={index} className="hidden-button"></div>
    ))}
</div>

      </div>
      {compareProducts.length > 0 && (
  <div className="table-responsive">
    <table className="table table-fixed" style={{ width: compareProducts.length === 2 ? '75%' : compareProducts.length === 3 ? '100%' : '50%', float: 'left' }}>
      <thead>
        <tr>
          <th scope="col">Specifications</th>
          {compareProducts.map((productId, index) => (
            <th key={index} scope="col" style={{ fontWeight: 'bold' }}>
              {data.getAllProducts.find((p) => p.id === productId).title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {allSpecKeys.map((specKey, specIndex) => {
          const filteredEntries = compareProducts[0] &&
            Object.entries(
              data.getAllProducts.find((p) => p.id === compareProducts[0]).specs[specKey]
            )
              .filter(
                ([key, value]) =>
                  key !== "__typename" &&
                  key !== "productId" &&
                  !(key === "value1" && value === 0) &&
                  !(key === "value2" && value === 0) &&
                  (Array.isArray(value)
                    ? value.filter((item) => item !== 0).length > 0
                    : value !== 0)
              );

          const rows = filteredEntries.flatMap(([key, value], index, arr) => {
            const displayName = key
              .replace(/([a-z])([A-Z])/g, '$1 $2')
              .replace('RAMmemory', 'RAM Memory');

            const units = {
              ScreenResolution: (value) =>
                typeof value === "string"
                  ? value.replace(/(\d+)\s*,\s*(\d+)/, "$1 x $2")
                  : value,
              TotalStorageCapacity: (value) => `${value} GB`,
              ProductHeight: (value) => `${value} Inches`,
              ProductWidth: (value) => `${value} Inches`,
              ProductDepth: (value) => `${value} Inches`,
              ProductWeight: (value) => `${value} Pounds`,
              Warranty: (value) => `${value} ${value === 1 ? "Year" : "Years"}`,
              ScreenSize: (value) => `${value} Inches`,
              FrontFacingCamera: (value) => `${value} Pixels Vertical Resolution`,
              RAMmemory: (value) => `${value} GB`,
              BatteryLife: (value) => `${value} Hours`,
            };

            const newRow = (
              <tr key={`${specIndex}_${index}`} className="offset-right">
                <td className="spec-names">{displayName}</td>
                {compareProducts.map((productId) => {
                  const product = data.getAllProducts.find(
                    (p) => p.id === productId
                  );
                  if (!product) {
                    return (
                      <td key={`${productId}_${specIndex}_${index}`}></td>
                    );
                  }
                  const specValue = product.specs[specKey][key];
                  const displayValue = Array.isArray(specValue)
                    ? specValue.filter((item) => item !== 0).join(', ')
                    : specValue;

                  return (
                    <td key={`${productId}_${specIndex}_${index}`}>
                      {units.hasOwnProperty(key)
                        ? units[key](displayValue)
                        : displayValue}
                    </td>
                  );
                })}
              </tr>
            );

            let displayRow = null;
    if (index === 0) {
      const screenSize = arr.find(([k]) => k === "ScreenSize");
      const displayType = arr.find(([k]) => k === "DisplayType");
      
      if (screenSize && screenSize[1] !== 0) {
        displayRow = (
          <tr key={`${specIndex}_DISPLAY`} className="row-title">
            <td className="spec-names2">DISPLAY</td>
            {compareProducts.map((productId) => (
              <td key={`${productId}_${specIndex}_DISPLAY`}></td>
            ))}
          </tr>
        );
      } else if (displayType && displayType[1] !== "") {
        displayRow = (
          <tr key={`${specIndex}_DISPLAY`} className="offset-right">
            <td className="spec-names2">DISPLAY</td>
            {compareProducts.map((productId) => (
              <td key={`${productId}_${specIndex}_DISPLAY`}></td>
            ))}
          </tr>
        );
      }
    }


    let memoryRow = null;
    if (key === "TotalStorageCapacity" && value !== 0) {
      memoryRow = (
        <tr key={`${specIndex}_MEMORY`} className="offset-right">
          <td className="spec-names2">MEMORY</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_MEMORY`}></td>
          ))}
        </tr>
      );
    }

    let cpuAndOsRow = null;
    if (key === "OperatingSystem" && value !== "") {
      cpuAndOsRow = (
        <tr key={`${specIndex}_CPU_OS`} className="offset-right">
          <td className="spec-names2">CPU & OS</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_CPU_OS`}></td>
          ))}
        </tr>
      );
    }

    let connectivityRow = null;
    if (key === "WirelessConnectivity" && value !== "") {
      connectivityRow = (
        <tr key={`${specIndex}_CONNECTIVITY`} className="offset-right">
          <td className="spec-names2">CONNECTIVITY</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_CONNECTIVITY`}></td>
          ))}
        </tr>
      );
    }

    let cameraRow = null;
    if (key === "FrontFacingCamera" && value !== 0) {
      cameraRow = (
        <tr key={`${specIndex}_CAMERA`} className="offset-right">
          <td className="spec-names2">CAMERA</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_CAMERA`}></td>
          ))}
        </tr>
      );
    } else if (key === "RearFacingCamera" && value !== 0 && cameraRow) {
      cameraRow = (
        <tr key={`${specIndex}_CAMERA`} className="offset-right">
          <td className="spec-names2">CAMERA</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_CAMERA`}></td>
          ))}
        </tr>
      );
    }

    let generalRow = null;
    if (key === "Color" && value !== "") {
      generalRow = (
        <tr key={`${specIndex}_GENERAL`} className="offset-right">
          <td className="spec-names2">GENERAL</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_GENERAL`}></td>
          ))}
        </tr>
      );
    }

    let dimensionsRow = null;
    if (key === "ProductHeight" && value !== 0) {
      dimensionsRow = (
        <tr key={`${specIndex}_DIMENSIONS`} className="offset-right">
          <td className="spec-names2">DIMENSIONS</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_DIMENSIONS`}></td>
          ))}
        </tr>
      );
    }

    let warrantyRow = null;
    if (key === "Warranty" && value !== 0) {
      dimensionsRow = (
        <tr key={`${specIndex}_WARRANTY`} className="offset-right">
          <td className="spec-names2">WARRANTY</td>
          {compareProducts.map((productId) => (
            <td key={`${productId}_${specIndex}_WARRANTY`}></td>
          ))}
        </tr>
      );
    }

    const rows = [];

if (specIndex === 0) {
  if (displayRow) {
    rows.push(displayRow);
  }
  if (memoryRow) {
    rows.push(memoryRow);
  }
  if (cpuAndOsRow) {
    rows.push(cpuAndOsRow);
  }
  if (connectivityRow) {
    rows.push(connectivityRow);
  }
  if (cameraRow) {
    rows.push(cameraRow);
  }
  if (generalRow) {
    rows.push(generalRow);
  }
  if (dimensionsRow) {
    rows.push(dimensionsRow);
  }
  if (warrantyRow) {
    rows.push(warrantyRow);
  }
}
rows.push(newRow);

return (
  <React.Fragment key={specKey}>
    {rows}
  </React.Fragment>
);
  });

  return rows;
})}
      </tbody>
      
      </table>
</div>
)}
    </div>
  );
};

export default CompareProducts;