import React from "react";
import Tooth from "./Tooth";

const teeth = {
  top: [
    { cnt: 18 },
    { cnt: 17 },
    { cnt: 16 },
    { cnt: 15 },
    { cnt: 14 },
    { cnt: 13 },
    { cnt: 12 },
    { cnt: 11 },
    { cnt: 21 },
    { cnt: 22 },
    { cnt: 23 },
    { cnt: 24 },
    { cnt: 25 },
    { cnt: 26 },
    { cnt: 27 },
    { cnt: 28 },
  ],
  bottom: [
    { cnt: 48 },
    { cnt: 47 },
    { cnt: 46 },
    { cnt: 45 },
    { cnt: 44 },
    { cnt: 43 },
    { cnt: 42 },
    { cnt: 41 },
    { cnt: 31 },
    { cnt: 32 },
    { cnt: 33 },
    { cnt: 34 },
    { cnt: 35 },
    { cnt: 36 },
    { cnt: 37 },
    { cnt: 38 },
  ],
};

function AdultTeeth() {
  return (
    <div className="pb-5 d-inline-block position-relative">
      <div>
        {teeth.top.map((tooth) => (
          <Tooth
            key={`top-t-${tooth.cnt}`}
            toothNumber={tooth.cnt}
            disabled={true} // should be a boolean
            position="top"
            mode="select" // provide a valid mode
          />
        ))}
      </div>
      <div className="dashed-v"></div>
      <div className="mt-2 pt-2 dashed-b">
        {teeth.bottom.map((tooth) => (
          <Tooth
            key={`bottom-t-${tooth.cnt}`}
            toothNumber={tooth.cnt}
            disabled={true}
            position="bottom"
            mode="select"
          />
        ))}
      </div>
    </div>
  );
}

export default AdultTeeth;