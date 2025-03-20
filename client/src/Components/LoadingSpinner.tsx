import React from "react";
import { MutatingDots } from "react-loader-spinner";

interface LoadingSpinnerProps {
  setManualOverride: (arg0: boolean) => void;
  fetchError: boolean;
}
const LoadingSpinner = (props: LoadingSpinnerProps) => {
  const { setManualOverride, fetchError } = props;
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
        flexDirection: "column",
        gap: "1rem",
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
      {fetchError ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ maxWidth: "20rem", textAlign: "center" }}>
            Something went wrong while trying to fetch the requested resource.
            Trying again.
          </p>
          <button onClick={() => setManualOverride(true)}>
            <p style={{ fontWeight: "bold" }}>Stop Fetching</p>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default LoadingSpinner;
