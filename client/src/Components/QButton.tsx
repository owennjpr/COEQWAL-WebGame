import React, { ReactNode, useState } from "react";
import QuestionSVG from "../svgs/QuestionSVG";
import ReactModal from "react-modal";

interface QButtonProps {
  headerText: string;
  bodyText: ReactNode;
  imageRef?: string;
  imageAlt?: string;
}

const QButton = (props: QButtonProps) => {
  const { headerText, bodyText, imageRef, imageAlt } = props;
  const [show, setShow] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setShow(true)} style={{ marginTop: 4 }}>
        <QuestionSVG />
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
            width: "35%",
            minWidth: 450,
            height: "35%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "0px",
            borderRadius: "0.5rem",
            boxShadow: "2px 3px 15px rgb(213, 213, 213)",
            backgroundColor: "#FFFFFFD0",
            backdropFilter: "blur(12px)",
          },
        }}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setShow(false)}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>{headerText}</h1>
          {imageRef ? (
            <img src={imageRef} alt={imageAlt ?? "missing alt text"} />
          ) : null}
          {bodyText}
        </div>
      </ReactModal>
    </div>
  );
};

export default QButton;
