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
      <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" onClick={() => setDisplayColorPicker(!displayColorPicker)}>
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