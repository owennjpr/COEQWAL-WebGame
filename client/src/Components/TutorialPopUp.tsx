import React, { CSSProperties, useState } from "react";
import ReactModal from "react-modal";
import QButton from "./QButton";
import WarningSymbol from "../svgs/WarningSymbol";
type Style = CSSProperties;

const TutorialPopUp = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const getRenderContent = () => {
    switch (page) {
      case 0:
        return (
          <div>
            <h1>Welcome to this California Water Management Dashboard</h1>
            <p style={{ color: "#666", fontSize: 18 }}>
              This project was created by{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://owennjpr.github.io/portfolio/"
              >
                Owen Prendergast
              </a>{" "}
              in collaboration with UC Berkeley's{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://live-coeqwal-ca.pantheon.berkeley.edu/"
              >
                Collaboratory for Equity in Water Allocation (COEQWAL)
              </a>
              . COEQWAL is a collaborative project focused on exploring
              alternative water management decisions and supporting more
              equitable and inclusive stewardship of California's water system.
            </p>
            <p style={{ color: "#666", fontSize: 18 }}>
              This dashboard uses data from{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://water.ca.gov/Library/Modeling-and-Analysis/Central-Valley-models-and-tools/CalLite"
              >
                CalLite
              </a>
              , a simplified version of{" "}
              <a
                style={{ color: "#829cb6" }}
                href="https://water.ca.gov/Library/Modeling-and-Analysis/Central-Valley-models-and-tools/CalSim-3"
              >
                CalSim
              </a>{" "}
              which is used to model and predict the flow of water through
              California. This site aggregates data from 600 CalLite scenarios
              to create an interactive way to learn more about the challenges of
              water management in California.
            </p>
            <p style={{ color: "#666", fontSize: 18 }}>
              To get started, press next to continue through the tutorial, or
              feel free to skip with the skip button.
            </p>
          </div>
        );
      case 1:
        return (
          <div>
            <h1> Controls</h1>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div
                style={{
                  width: "50%",
                  background: "#FFF6",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <p style={styles.miniHeader}>Agriculture Demands</p>
                <input
                  type="range"
                  name="demands"
                  min={60}
                  max={100}
                  step={10}
                  defaultValue={80}
                  style={styles.rangeSlider}
                />
              </div>
              <div
                style={{
                  width: "50%",
                  background: "#FFF6",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <p style={styles.miniHeader}>Delta Regulations</p>
                <div className="buttonBorder">
                  <select
                    name="delta"
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "none",
                      outline: "none",
                      backgroundColor: "#FFFFFFAA",
                      borderRadius: "0.5rem",
                      wordWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    <option value="1">
                      1: Baseline, all D1641 regulations in place
                    </option>
                    <option value="2">
                      2: No flow reqt, NDO and Rio Vista flows turned off
                    </option>
                    <option value="3">
                      2: No salinity reqt, station salinity & X2 requirements
                      off
                    </option>
                    <option value="4">
                      4: No D1641 flow or salinity requirements
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <p style={{ color: "#666", fontSize: 18 }}>
              These controls on the left side of the screen are your way of
              interacting with this dashboard. There are 5 different fields you
              can adjust: Agriculture Demands, Reservoir Carryover, Minimum Flow
              Requirements, Distribution Priority, Delta Regulations.
            </p>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <div
                style={{
                  background: "#FFF6",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                <QButton
                  headerText="This is a popup"
                  bodyText="This is where you would see the explanation of a term"
                />
              </div>
              <p style={{ color: "#666", fontSize: 18 }}>
                For individual descriptions of each term, you can click the ?
                button by each of the titles.
              </p>
            </div>
            <p style={{ color: "#666", fontSize: 18 }}>
              When you have made your selections you can hit the submit button
              to see the resulting scenario based on your choices.
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Water Year Type and Comparisons</h1>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "space-around",
              }}
            >
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
                <div className="buttonBorder">
                  <button type="button" className={"buttonInner"}>
                    <p style={styles.buttonText}>Previous</p>
                  </button>
                </div>
                <div className="buttonBorder">
                  <button type="button" className={"buttonInnerInactive"}>
                    <p style={styles.buttonText}>Baseline</p>
                  </button>
                </div>
              </div>
            </div>

            <p style={{ color: "#666", fontSize: 18 }}>
              Once you have submitted your selections you will see some
              information and options added to the top bar. Water year type
              (Wet/Dry) represents the differents between years with heavy
              rainfall and years with light rainfall. All of the visuals on the
              dashboard will be split into these two categories via the colors
              above.
            </p>
            <p style={{ color: "#666", fontSize: 18 }}>
              There is also the comparison type of previous/baseline. selecting
              baseline will compare your current selections with the default,
              and selecting previous will compare with your previous submission.
            </p>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>The Data Dashboard</h1>
            <div style={{ display: "flex", gap: "1rem" }}>
              <img
                src="/dashboard.png"
                alt="a map of california with delivery exceedance buckets, reservoir levels, an equity bar, and a color coded map of the delta"
                width={400}
                style={{
                  background: "#FFFA",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
              />
              <p style={{ color: "#666", fontSize: 18 }}>
                This dashboards holds all of the information about the scenario,
                including reservoir levels, deliveries, equity evaluation, and
                delta salinity. <br />
                <br />
                For more information about what certain metrics mean or how they
                are calculated, press the ? button next to any of them.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h1>Warnings</h1>
            <div
              className="buttonBorder"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <div style={styles.warningBox}>
                <WarningSymbol style={styles.warnSymbol} />
                <p style={{ fontSize: "0.8rem", color: "#666" }}>
                  Reservoirs are underfilled during dry years. Water managers
                  may need to implement allocation cuts, reduce environmental
                  flows, or risk not having adequate carryover storage to meet
                  demands if dry conditions continue.
                </p>
              </div>
            </div>
            <div
              className="buttonBorder"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <div style={styles.warningBox}>
                <WarningSymbol style={styles.warnSymbol} />
                <p style={{ fontSize: "0.8rem", color: "#666" }}>
                  Very high Delta Salinity levels during dry years. Salinity can
                  contaminate municipal water supplies, destroy agricultural
                  crops, and severely degrade freshwater fish habitat.
                </p>
              </div>
            </div>

            <p style={{ fontSize: 18, color: "#666" }}>
              Once you have submitted, some warnings may pop up and tell you
              potential concerns with your allocation approach. Try changing
              your inputs and resubmitting to see if you can minimize the number
              of warnings.
            </p>
          </div>
        );
      case 5:
        return (
          <div>
            <h1>Thats all!</h1>
            <p style={{ fontSize: 18, color: "#666" }}>
              Experiment with different the different options and learn more
              about California water management!
            </p>
          </div>
        );

      default:
        return <p>uh oh no page here</p>;
    }
  };

  return (
    <ReactModal
      isOpen={visible}
      style={{
        overlay: {
          // background: "rgba(255, 255, 255, 0.6)",
          background:
            "linear-gradient(-45deg,rgba(199, 223, 251, 0.3),rgba(177, 198, 253, 0.3),rgba(191, 224, 236, 0.5),rgba(132, 203, 241, 0.2))",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "50%",
          minWidth: 600,
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "0px solid black",
          borderRadius: "1rem",
          boxShadow: "0px 0px 5px rgb(213,213,213)",
          backgroundColor: "#FFFFFF80",
          backdropFilter: "blur(8px)",
        },
      }}
      shouldCloseOnOverlayClick={false}
      onRequestClose={() => setVisible(false)}
    >
      {getRenderContent()}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="buttonBorder">
          <button
            onClick={() => setVisible(false)}
            className="buttonInner"
            style={{
              padding: "5px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <p>Skip</p>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <div className="buttonBorder">
            <button
              onClick={() => {
                if (page !== 0) {
                  setPage(page - 1);
                }
              }}
              className="buttonInner"
              style={{
                padding: "5px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <p style={page === 0 ? { opacity: 0 } : { opacity: 1 }}>
                Previous
              </p>
            </button>
          </div>
          <div className="buttonBorder">
            <button
              onClick={() => {
                if (page === 5) {
                  setVisible(false);
                } else {
                  setPage(page + 1);
                }
              }}
              className="buttonInner"
              style={{
                padding: "5px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <p>{page === 5 ? "End" : "Next"}</p>
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default TutorialPopUp;

const styles = {
  coreblock: {
    backgroundColor: "#FFFFFF70",
    backdropFilter: "blur(8px)",
    // border: "black 1px solid",
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 10px rgb(213, 213, 213)",
    width: "25vmin",
    height: "fit-content",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    gap: "1rem",
    gridColumn: "1 / -1",
  } as Style,
  coreblockMin: {
    backgroundColor: "rgb(240, 240, 250)",
    margin: "5px",
    padding: "0px 10px 0px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    gridColumn: "1 / -1",
    justifyContent: "space-between",
  } as Style,

  miniHeader: {
    fontWeight: "bold",
    lineHeight: "15px",
  } as Style,
  titleQPair: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
  } as Style,
  rangeSlider: {
    width: "100%",
    height: "16px",
    borderRadius: "4px",
    outline: "none",
    background: "linear-gradient(-45deg, #dadaf0, #e1ebff, #e4e2ff, #d2ecf6)",
    WebkitAppearance: "none",
    appearance: "none",
  } as Style,
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 0,
  } as Style,
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
  } as Style,
  warningBox: {
    backgroundColor: "#FFFFFF",
    // boxShadow: "0px 0px 6px rgb(180, 180, 180)",
    display: "flex",
    // : "row",
    alignItems: "center",
    gap: 10,
    border: "white solid 1px",
    borderRadius: "0.5rem",
    paddingLeft: 5,
    paddingRight: 5,
  } as Style,
  warnSymbol: {
    color: "rgb(255, 195, 15)",
    minWidth: "16px",
    minHeight: "16px",
    flexShrink: 0,
  } as Style,
};
