import React, { useEffect, useState } from "react";
function ProgressBar({ totalPrice, totalPayed }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(Number(totalPayed / (totalPrice / 100)));
  }, [totalPayed, totalPrice]);
  const getColor = () => {
    if (progress > 100) {
      return "rgb(255, 50, 50,.8)";
    } else if (progress === 100 || totalPayed === totalPrice) {
      return "rgb(126, 224, 152,.7)";
    } else {
      return "rgb(255, 98, 28,.7)";
    }
  };
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill d-flex justify-content-center align-items-center"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        ></div>
        <p>
          {totalPayed}/{totalPrice}
        </p>
      </div>
    </div>
  );
}

export default ProgressBar;
