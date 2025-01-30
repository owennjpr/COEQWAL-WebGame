import React, { useState } from "react";
import ReactModal from "react-modal";

const TutorialPopUp = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  const getRenderContent = () => {
    switch (page) {
      case 0:
        return (
          <div>
            <h1>
              Welcome to this interactive California water management dashboard
              created in partnership with COEQWAL.
            </h1>
            <p>
              To get started, press next to continue through the tutorial, or
              feel free to skip with the skip button{" "}
            </p>
          </div>
        );
      case 1:
        return (
          <div>
            <h1> Part 1: The Control Bar</h1>
            <img
              src="/Levers.png"
              alt="5 toggleable fields called: Agriculture Demands, Carryover, Distribution Priority, Delta Regulations, and Minimum Flow Requirements"
              width={600}
              style={{ border: "2px solid black" }}
            />
            <p>
              {" "}
              The control bar is your way of interacting with this dashboard. It
              allows you to select different values for each of 5 different
              fields. etc, etc, etc.
            </p>
            <p>
              When you have made your selections you can hit the submit button
              to fetch new data, and minimize the bar until you are ready to use
              it again
            </p>
            <p>
              For individual descriptions of each term, you can click the ?
              button by each of the titles{" "}
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Part 2: Additional Controls</h1>
            <img
              src="/AdditionalControls.png"
              alt="a series of buttons including previous/baseline, dry/wet years, and show warnings."
              width={600}
              style={{ border: "2px solid black" }}
            />
            <p>
              Once you have submitted your selections you will be provided with
              some additional controls.
            </p>
            <p>
              These give you the options to change how you are making
              comparisons, change whether you are looking at dry or wet years,
              and display potential warnings from the generated scenario
            </p>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>Part 3: The Data Dashboard</h1>
            <img
              src="/DataDashboard.png"
              alt="a map of california with delivery exceedance buckets, reservoir levels, an equity bar, and a color coded map of the delta"
              width={500}
              style={{ border: "2px solid black" }}
            />
            <p>
              This dashboards holds all of the information about the scenario,
              for more information about what certain metrics mean or how they
              are calculated, press the ? button next to any of them.
            </p>
          </div>
        );
      case 4:
        return (
          <div>
            <h1>Thats all for now!</h1>
            <p>Experiment with different water management options.</p>
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
        overlay: { background: "rgba(0, 0, 40, 0.15)" },
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
        <button onClick={() => setVisible(false)}>
          <p>Skip</p>
        </button>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <button
            onClick={() => {
              if (page !== 0) {
                setPage(page - 1);
              }
            }}
          >
            <p style={page === 0 ? { opacity: 0 } : { opacity: 1 }}>Previous</p>
          </button>
          <button
            onClick={() => {
              if (page === 4) {
                setVisible(false);
              } else {
                setPage(page + 1);
              }
            }}
          >
            <p>{page === 4 ? "End" : "Next"}</p>
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default TutorialPopUp;
