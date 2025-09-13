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
            paddingBottom: "3rem",
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{headerText}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
              onClick={() => setShow(false)}
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
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
