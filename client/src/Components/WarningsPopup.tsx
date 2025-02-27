import React, { useState, useEffect, CSSProperties } from "react";
import ReactModal from "react-modal";
import XIcon from "../svgs/XSVG";
import WarningSymbol from "../svgs/WarningSymbol";
import { Warnings } from "../types";

type Style = CSSProperties;

interface WarningsPopupProps {
  warnings: Warnings;
}

function WarningsPopup(props: WarningsPopupProps) {
  const { warnings } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [warningList, setWarningList] = useState<string[]>([]);

  useEffect(() => {
    let warn_iter: string[] = [];
    if (warnings.deliveriesNODDry) {
      warn_iter.push("warning dry year deliveries north");
    }
    if (warnings.deliveriesNODWet) {
      warn_iter.push("warning wet year deliveries north");
    }

    if (warnings.deliveriesSODDry) {
      warn_iter.push("warning dry year deliveries south");
    }

    if (warnings.deliveriesSODWet) {
      warn_iter.push("warning wet year deliveries south");
    }

    if (warnings.deltaAlertDry) {
      warn_iter.push("warning delta dry years");
    }

    if (warnings.deltaAlertWet) {
      warn_iter.push("warning delta wet years");
    }

    if (warnings.deltaCriticalDry) {
      warn_iter.push("critical delta dry years");
    }

    if (warnings.deltaCriticalWet) {
      warn_iter.push("critical delta wet years");
    }

    if (warnings.equityDry) {
      warn_iter.push("warning equity dry years");
    }

    if (warnings.equityWet) {
      warn_iter.push("warning equity wet years");
    }

    if (warnings.reservoirsDry) {
      warn_iter.push("warning reservoirs dry years");
    }

    if (warnings.reservoirsWet) {
      warn_iter.push("warning reservoirs wet years");
    }

    setWarningList(warn_iter);
  }, [warnings]);

  return (
    <div>
      <button style={styles.buttonInactive} onClick={() => setVisible(true)}>
        <p style={styles.buttonText}>Show Warnings</p>
        <p style={styles.warningNum}>({warningList.length})</p>
      </button>
      <ReactModal
        isOpen={visible}
        style={{
          overlay: { background: "rgba(0, 0, 40, 0.15)" },
          content: {
            background: "white",
            position: "absolute",
            right: 0,
            left: "auto",
            top: 0,
            bottom: 0,
            width: "25%",
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
          {warningList.map((item) => {
            return (
              <div style={styles.warningBox}>
                <WarningSymbol style={styles.warnSymbol} />
                <p>{item}</p>
              </div>
            );
          })}
        </div>
      </ReactModal>
    </div>
  );
}

export default WarningsPopup;

const styles = {
  buttonInactive: {
    padding: "5px",
    border: "2px solid black",
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
  warningBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgb(230, 230, 240)",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  } as Style,
  warnSymbol: {
    color: "rgb(220, 190, 0)",
  } as Style,
};
