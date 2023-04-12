import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useProtected from "../../hooks/useProtected";

const PriceSlider = ({ min, max, onPriceChange, value }) => {
  useProtected();

  const handleChange = (newRange) => {
    onPriceChange(newRange);
  };

  return (
    <div style={{ marginTop: "19px", width: "15rem" }}>
      <Slider
        range
        min={min}
        max={max}
        value={value}
        allowCross={false}
        onChange={handleChange}
        trackStyle={[
          {
            backgroundColor: "#007bff",
          },
        ]}
        handleStyle={[
          {
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            borderWidth: "1px",
            borderStyle: "solid",
            width: "20px",
            height: "20px",
            marginLeft: "-10px",
            marginTop: "-9px",
          },
          {
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            borderWidth: "1px",
            borderStyle: "solid",
            width: "20px",
            height: "20px",
            marginLeft: "-10px",
            marginTop: "-9px",
          },
        ]}
        railStyle={{ backgroundColor: "#c7c7c7", height: "6px" }}
      />
      <div className="d-flex justify-content-between">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
};

export default PriceSlider;