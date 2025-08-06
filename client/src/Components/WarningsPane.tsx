import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { Warnings } from "../types";
import WarningSymbol from "../svgs/WarningSymbol";

type Style = CSSProperties;

interface WarningsPopupProps {
  warnings: Warnings | null;
}

const WarningsPane = (props: WarningsPopupProps) => {
  const { warnings } = props;
  const [warningList, setWarningList] = useState<string[]>([]);
  const box = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (box.current) {
        setWidth(box.current.getBoundingClientRect().width);
        console.log(box.current.getBoundingClientRect().width);
      }
    };

    setTimeout(() => {
      updateWidth();
    }, 0);

    const handleResize = () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        updateWidth();
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (warnings) {
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
    }
  }, [warnings]);

  return (
    <div
      ref={box}
      style={{
        width: "100%",
        height: "fit-content",
        margin: 10,
      }}
    >
      {width < 300 ? null : (
        <div
          style={{
            backgroundColor: "#FFFFFF70",
            boxShadow: "0px 0px 10px rgb(213, 213, 213)",
            borderRadius: "0.5rem",
            padding: 10,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <p style={styles.titleText}>Warnings</p>
          {warningList.map((item) => {
            return (
              <div
                className="buttonBorder"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <div style={styles.warningBox}>
                  <WarningSymbol style={styles.warnSymbol} />
                  <p>{item}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WarningsPane;

const styles = {
  warningBox: {
    backgroundColor: "#FFFFFF",
    // boxShadow: "0px 0px 6px rgb(180, 180, 180)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    border: "white solid 1px",
    borderRadius: "0.5rem",
    paddingLeft: 10,
  } as Style,
  warnSymbol: {
    color: "rgb(255, 195, 15)",
  } as Style,
  titleText: {
    fontSize: 20,
    fontWeight: 600,
  } as Style,
};
