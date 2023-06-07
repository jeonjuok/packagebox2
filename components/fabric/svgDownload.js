import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [svgFiles, setSvgFiles] = useState([]);

  const downloadSvgFile = (id) => {
    axios.get(`https://img.packative.com/original/library/media/image/${id}.svg`, { responseType: 'blob' })
      .then((response) => {
        const svgFile = URL.createObjectURL(response.data);
        setSvgFiles((prevSvgFiles) => [...prevSvgFiles, svgFile]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderSvgFiles = () => {
    return svgFiles.map((svgFile, index) => (
      <img key={index} src={svgFile} alt="svg file" />
    ));
  };

  return (
    <div>
      <button onClick={() => downloadSvgFile("adbf50df-f785-11ec-bfd8-0242ac170003")}>
        Download 들꽃 일러스트 96
      </button>
      {/* ...rest of the buttons... */}
      <br />
      {renderSvgFiles()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
