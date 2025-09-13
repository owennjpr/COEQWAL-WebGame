import React, { ReactNode, useState } from "react";
import ReactModal from "react-modal";

interface DeltaPopupProps {
  deltaVis: ReactNode;
}

const DeltaPopup = (props: DeltaPopupProps) => {
  const { deltaVis } = props;
  const [show, setShow] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setShow(true)}>
        <div
          className="clickable"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#FFFFFF88",
            backdropFilter: "blur(2px)",
            padding: 10,
            borderRadius: "0.5rem",
            boxShadow: "0px 1px 10px rgb(213, 213, 213)",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 0,
            }}
          >
            Delta Salinity
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(-45deg, #c1c1ea,#cceefb, #aec2ee, #a4d1e2)",
              padding: 3,
            }}
          >
            <img
              src="/NumberedDeltaOutline.png"
              style={{
                width: "15vmin",
                height: "auto",
                background:
                  "linear-gradient(-45deg, #c1c1ea,#cceefb, #aec2ee, #a4d1e2)",
              }}
              alt="map of california delta"
            />
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={show}
        style={{
          overlay: {
            background: "rgba(255, 255, 255, 0.4)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "60%",
            minWidth: 450,
            maxWidth: "90vw",
            height: "65%",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "0px",
            borderRadius: "0.5rem",
            boxShadow: "2px 3px 15px rgb(213, 213, 213)",
            backgroundColor: "#FFFFFFD0",
            backdropFilter: "blur(8px)",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setShow(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              textAlign: "left",
              marginBottom: "1rem",
            }}
          >
            <h1
              style={{
                margin: "0 0 0.5rem 0",
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              California Delta Salinity
            </h1>
            <p
              style={{
                margin: "0",
                fontSize: "0.9rem",
                color: "#666",
                fontStyle: "italic",
              }}
            >
              The California Delta is regulated through water quality standards
              that control salinity levels, most notably through the "X2"
              standard - the point identified by its distance from the Golden
              Gate Bridge where salinity at the river's bottom is about 2 parts
              per thousand (ppt) and is the basis for standards to protect
              aquatic life. This map shows the x2 levels during wet (top) and
              dry (bottom) years relative to the golden gate bridge in blue.
            </p>
          </div>
          <div style={{ flex: 1, overflow: "hidden", paddingBottom: "1rem" }}>
            {deltaVis}
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default DeltaPopup;
