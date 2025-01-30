import React, { useState } from "react";
import QuestionSVG from "../svgs/QuestionSVG";
import ReactModal from "react-modal";

interface QButtonProps {
  headerText: string;
  bodyText: string;
  imageRef?: string;
  imageAlt?: string;
}

const QButton = (props: QButtonProps) => {
  const { headerText, bodyText, imageRef, imageAlt } = props;
  const [show, setShow] = useState<boolean>(false);
  return (
    <div>
      <div onClick={() => setShow(true)}>
        <QuestionSVG />
      </div>
      <ReactModal
        isOpen={show}
        style={{
          overlay: { background: "rgba(0, 0, 40, 0.15)" },
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
          <p>{bodyText}</p>
        </div>
      </ReactModal>
    </div>
  );
};

export default QButton;
