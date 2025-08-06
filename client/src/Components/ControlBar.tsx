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
              backgroundColor: "#FFFFFF70",
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
                <div style={{ paddingLeft: 8 }}>
                  <QButton
                    headerText="Changing Comparison Type:"
                    bodyText={
                      <div>
                        Wet and dry years create dramatically different water
                        management challenges, requiring flexible operational
                        strategies and long-term planning. During wet years,
                        water managers must balance flood control with water
                        storage, making critical decisions about reservoir
                        releases to prevent downstream flooding while capturing
                        as much water as possible for future dry periods.
                        <br />
                        <br />
                        Conversely, dry years force difficult allocation
                        decisions among competing water users, requiring careful
                        rationing of stored supplies and sometimes triggering
                        emergency conservation measures. The cyclical nature of
                        California's hydrology, with multi-year droughts
                        followed by periods of abundant rainfall, makes it
                        essential for water systems to be designed with
                        sufficient storage capacity and operational flexibility
                        to smooth out these natural variations.
                        <br />
                        <br /> Understanding wet versus dry year patterns is
                        fundamental to developing resilient water management
                        policies that can maintain reliable supplies for all
                        needs across the full range of climatic conditions.
                      </div>
                    }
                  />
                </div>
              </div>
              <div style={styles.buttonContainer}>
                <div className="buttonBorder">
                  <button
                    type="button"
                    onClick={scenario ? toggleCompare : () => null}
                    className={
                      compareType === "previous"
                        ? "buttonInner"
                        : "buttonInnerInactive"
                    }
                  >
                    <p style={styles.buttonText}>Previous</p>
                  </button>
                </div>
                <div className="buttonBorder">
                  <button
                    type="button"
                    onClick={scenario ? toggleCompare : () => null}
                    className={
                      compareType === "baseline"
                        ? "buttonInner"
                        : "buttonInnerInactive"
                    }
                  >
                    <p style={styles.buttonText}>Baseline</p>
                  </button>
                </div>
                <QButton
                  headerText="Changing Comparison Type:"
                  bodyText={
                    <div>
                      Allows you to decide whether to compare with your previous
                      submission or the operational baseline. <br />
                      <br />
                      The baseline serves as the benchmark against which
                      proposed water infrastructure projects and operational
                      changes are compared, allowing water managers to assess
                      the impacts of different alternatives on water deliveries,
                      reservoir operations, and environmental conditions.
                    </div>
                  }
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
    border: "0px",
    // backgroundColor: "rgb(209, 249, 255)",
  } as Style,
  buttonInactive: {
    padding: "5px",
    border: "0px",
    // backgroundColor: "white",
  } as Style,
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 0,
  } as Style,
};
