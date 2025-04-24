import React, { CSSProperties } from "react";
import WarningsPopup from "./WarningsPopup";
import { Warnings } from "../types";
import QButton from "./QButton";

type Style = CSSProperties;

interface ControlBarProps {
  scenario: string;
  minimized: boolean;
  setMinimized: (arg0: boolean) => void;
  compareType: string;
  setCompareType: (arg0: string) => void;
  handleCompareType: (arg0: string) => void;
  warnings: Warnings;
}

function ControlBar(props: ControlBarProps) {
  const {
    scenario,
    minimized,
    setMinimized,
    compareType,
    setCompareType,
    handleCompareType,
    warnings,
  } = props;

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

  if (scenario === undefined) {
    return (
      <div style={styles.outerBlock}>
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {minimized ? (
          <div
            style={{
              backgroundColor: "#FFFFFFA0",
              backdropFilter: "blur(8px)",
              // border: "black 2px solid",
              borderRadius: "0.5rem",
              boxShadow: "0px 1px 10px rgb(213, 213, 213)",
              height: 70,
              width: 70,
              margin: "5px",
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setMinimized(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              className="bi bi-arrow-bar-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"
              />
            </svg>
          </div>
        ) : null}
        <div style={styles.outerBlock}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
              paddingLeft: "0.5rem",
            }}
          >
            {scenario ? (
              <p>Displaying results</p>
            ) : (
              <p>
                Press the <span style={{ fontWeight: "bold" }}>Submit</span> to
                button to display results for a particular scenario
              </p>
            )}
          </div>
          {scenario ? (
            <>
              {" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p>Wet Years</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px black solid",
                    marginLeft: "0.5rem",
                    marginRight: "0.5rem",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 38,
                      background: "rgb(210, 255, 228)",
                    }}
                  />
                  <div
                    style={{
                      width: 50,
                      height: 38,
                      background: "rgb(255, 247, 212)",
                    }}
                  />
                </div>
                <p>Dry Years</p>
              </div>
              <div style={styles.buttonContainer}>
                <button
                  type="button"
                  onClick={scenario ? toggleCompare : () => null}
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
                  onClick={scenario ? toggleCompare : () => null}
                  style={
                    compareType === "baseline"
                      ? styles.buttonActive
                      : styles.buttonInactive
                  }
                >
                  <p style={styles.buttonText}>Baseline</p>
                </button>
                <QButton
                  headerText="Changing Comparison Type:"
                  bodyText="Select between comparing the current scenario with either the operational baseline or the previously selected scenario."
                />
              </div>
              <WarningsPopup warnings={scenario ? warnings : null} />
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default ControlBar;

const styles = {
  outerBlock: {
    width: "100%",
    backgroundColor: "#FFFFFFA0",
    backdropFilter: "blur(8px)",
    // border: "black 2px solid",
    borderRadius: "0.5rem",
    boxShadow: "0px 1px 10px rgb(213, 213, 213)",
    margin: "5px",
    marginTop: "10px",
    marginRight: "10px",
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
    border: "1px solid black",
    borderRadius: "0.5rem",
    backgroundColor: "rgb(180, 255, 180)",
  } as Style,
  buttonInactive: {
    padding: "5px",
    border: "1px solid black",
    borderRadius: "0.5rem",
    backgroundColor: "white",
  } as Style,
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 0,
  } as Style,
};
