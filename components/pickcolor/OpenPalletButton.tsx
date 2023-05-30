import React, { useState } from "react";
import { GithubPicker } from "react-color";

const ButtonExample = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [pickColor, setPickColor] = useState();

  const handleChange = (color: { hex: any }) => {
    console.log(color.hex);
    setPickColor(color.hex);
  };

  return (
    <div>
      <input value={pickColor} />
      <button onClick={() => setDisplayColorPicker(!displayColorPicker)}>
        Pick Color
      </button>
      {displayColorPicker ? (
        <div onClick={() => setDisplayColorPicker(!displayColorPicker)}>
          <GithubPicker onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ButtonExample;
