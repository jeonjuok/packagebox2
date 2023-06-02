import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

import CanvasSplitter from "./CanvasSplitter";

const App = () => {
  const [leftCanvasWidth, setLeftCanvasWidth] = useState(200);
  const [rightCanvasWidth, setRightCanvasWidth] = useState(100);

  return (
    <div>
      <CanvasSplitter
        leftCanvasWidth={leftCanvasWidth}
        rightCanvasWidth={rightCanvasWidth}
      />
    </div>
  );
};

export default App;
