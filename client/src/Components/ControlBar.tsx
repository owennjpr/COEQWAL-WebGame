import React, { CSSProperties, useEffect, useState } from "react";
import WarningsPopup from "./WarningsPopup";
import { Warnings } from "../types";

type Style = CSSProperties;

interface ControlBarProps {
  scenario: string;
  compareType: string;
  setCompareType: (arg0: string) => void;
  handleWYT: (arg0: string) => void;
  handleCompareType: (arg0: string) => void;
  warnings: Warnings;
}

function ControlBar(props: ControlBarProps) {
  const {
    scenario,
    compareType,
    setCompareType,
    handleWYT,
    handleCompareType,
    warnings,
  } = props;
  const [wyt, setWyt] = useState<string>("dry");

  const toggleWYT = () => {
    if (wyt === "dry") {
      setWyt("wet");
    } else {
      setWyt("dry");
    }
  };

  const toggleCompare = () => {
    let comp = "";
    if (compareType === "previous") {
      comp = "baseline";
    } else {
      comp = "previous";
    }
    setCompareType(comp);
    handleCompareType(comp);
  };

  useEffect(() => {
    handleWYT(wyt);
  }, [handleWYT, wyt]);

  if (scenario === undefined) {
    return (
      <div style={styles.outerBlock}>
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <div style={styles.outerBlock}>
        <p>Displaying results from scenario {scenario}</p>
        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={toggleCompare}
            style={
              compareType === "previous"
                ? styles.buttonActive
                : styles.buttonInactive
            }
          >
            <p style={styles.buttonText}>Previous</p>
          </button>
          <button
            type="button"
            onClick={toggleCompare}
            style={
              compareType === "baseline"
                ? styles.buttonActive
                : styles.buttonInactive
            }
          >
            <p style={styles.buttonText}>Baseline</p>
          </button>
        </div>
        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={toggleWYT}
            style={wyt === "dry" ? styles.buttonActive : styles.buttonInactive}
          >
            <p style={styles.buttonText}>Dry Years</p>
          </button>
          <button
            type="button"
            onClick={toggleWYT}
            style={wyt === "wet" ? styles.buttonActive : styles.buttonInactive}
          >
            <p style={styles.buttonText}>Wet Years</p>
          </button>
        </div>
        <WarningsPopup warnings={warnings} />
      </div>
    );
  }
}

export default ControlBar;

const styles = {
  outerBlock: {
    backgroundColor: "rgb(240, 240, 250)",
    margin: "5px",
    padding: "10px",
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  } as Style,
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
  } as Style,
  buttonActive: {
    padding: "5px",
    border: "2px solid black",
    backgroundColor: "rgb(180, 255, 180)",
  } as Style,
  buttonInactive: {
    padding: "5px",
    border: "2px solid black",
    backgroundColor: "white",
  } as Style,
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
  } as Style,
};
