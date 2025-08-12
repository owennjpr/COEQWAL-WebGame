import React, { useState, CSSProperties } from "react";
import ReactModal from "react-modal";
import XIcon from "../svgs/XSVG";
import WarningsList from "./WarningsList";
import { Warnings } from "../types";

type Style = CSSProperties;

interface WarningsPopupProps {
  warnings: Warnings | null;
}

function WarningsPopup(props: WarningsPopupProps) {
  const { warnings } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <div className="buttonBorder">
        <button
          // style={styles.buttonInactive}
          className="buttonInner"
          style={{ display: "flex", gap: 4 }}
          onClick={warnings ? () => setVisible(true) : () => null}
        >
          <p style={styles.buttonText}>Show Warnings</p>
          <p style={styles.warningNum}>
            ({warnings ? Object.values(warnings).filter(Boolean).length : 0})
          </p>
        </button>
      </div>
      <ReactModal
        className={"overlay"}
        isOpen={visible}
        style={{
          overlay: {
            background: "rgba(255, 255, 255, 0.3)",
          },
          content: {
            background: "#FFFFFF50",
            position: "absolute",
            right: 0,
            left: "auto",
            top: 0,
            bottom: 0,
            width: "35%",
            margin: "10px",
            padding: "10px",
            paddingLeft: "20px",
            paddingRight: "20px",
            borderRadius: "0.5rem",
            backdropFilter: "blur(10px)",
            boxShadow: "-1px 0px 8px rgb(213, 213, 213)",
          },
        }}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setVisible(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={styles.titleText}>Warnings</p>
          <div onClick={() => setVisible(false)}>
            <XIcon />
          </div>
        </div>
        <div>
          <WarningsList warnings={warnings} />
        </div>
      </ReactModal>
    </div>
  );
}

export default WarningsPopup;

const styles = {
  buttonInactive: {
    padding: "5px",
    border: "0px",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  } as Style,
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 0,
  } as Style,
  warningNum: {
    fontSize: 14,
    fontWeight: 800,
    color: "red",
    lineHeight: 0,
  } as Style,
  titleText: {
    fontSize: 24,
    fontWeight: 600,
  } as Style,
};
