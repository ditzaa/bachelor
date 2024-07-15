// File: SliderComponent.jsx

import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import "./SliderComponent.css";

const SliderComponent = () => {
  const [value, setValue] = useState(5.0);

  useEffect(() => {
    localStorage.setItem("playerRating", value.toFixed(1));
  }, [value]);

  return (
    <div className="slider-container">
      <h4>Nota: {value.toFixed(1)}</h4>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        min={1}
        max={10}
        step={0.1}
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default SliderComponent;
