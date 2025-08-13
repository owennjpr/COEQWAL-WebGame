import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Warnings } from "../types";
import WarningsList from "./WarningsList";

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
        // Ensure it doesn't take up space when hidden
        height: "fit-content",
        boxSizing: "border-box",
      }}
    >
      <p style={styles.titleText}>Warnings</p>
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
};
