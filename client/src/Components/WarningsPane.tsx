import React, { CSSProperties } from "react";
import { Warnings } from "../types";
import WarningsList from "./WarningsList";
import WarningSymbol from "../svgs/WarningSymbol";

type Style = CSSProperties;

interface WarningsPopupProps {
  warnings: Warnings | null;
}

const WarningsPane = (props: WarningsPopupProps) => {
  const { warnings } = props;

  return (
    <div
      className="warnings-pane"
      style={{
        backgroundColor: "#FFFFFF70",
        boxShadow: "0px 0px 10px rgb(213, 213, 213)",
        borderRadius: "0.5rem",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        margin: 10,
        marginLeft: 5,
        marginRight: 10,
        flex: 1,
        minWidth: 0,
        height: "fit-content",
        maxHeight: "80vh",
        boxSizing: "border-box",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.40rem",
        }}
      >
        <WarningSymbol style={styles.warnSymbol} />
        <p style={styles.titleText}>Warnings</p>
      </div>
      <WarningsList warnings={warnings} />
    </div>
  );
};

export default WarningsPane;

const styles = {
  titleText: {
    fontSize: 20,
    fontWeight: 600,
  } as Style,
  warnSymbol: {
    color: "rgb(255, 195, 15)",
    minWidth: "16px",
    minHeight: "16px",
    flexShrink: 0,
  },
};
