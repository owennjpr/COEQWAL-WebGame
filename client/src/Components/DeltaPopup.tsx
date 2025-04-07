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
        {/* <QuestionSVG /> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "white",
            padding: 10,
            border: "2px black solid",
            borderRadius: "0.5rem",
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
          <img
            src="/NumberedDeltaOutline.png"
            style={{
              width: "15vmin",
              background: "red",
              border: "2px black solid",
            }}
            alt="map of california delta"
          />
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
            width: "55%",
            minWidth: 450,
            height: "65%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "black 2px solid",
            borderRadius: "0.5rem",
            boxShadow: "2px 3px 15px rgb(111, 111, 111)",
            backgroundColor: "#FFFFFFD0",
            backdropFilter: "blur(8px)",
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
          }}
        >
          {deltaVis}
        </div>
      </ReactModal>
    </div>
  );
};

export default DeltaPopup;
