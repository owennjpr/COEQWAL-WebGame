import React from "react";
import { MutatingDots } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        // background:
        //   "linear-gradient(-45deg,rgba(199, 223, 251, 0.3),rgba(177, 198, 253, 0.3),rgba(88, 211, 252, 0.5),rgba(85, 191, 248, 0.2))",
        // backgroundSize: "400% 400%",
        // animation: "gradient 10s ease infinite",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#237fc4"
        secondaryColor="#237fc4"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingSpinner;
