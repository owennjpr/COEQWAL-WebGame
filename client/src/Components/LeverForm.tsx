import React, { CSSProperties, useEffect, useState } from "react";
import { Levers } from "../types";
import QButton from "./QButton";

type Style = CSSProperties;

interface LeverFormProps {
  handleSubmit: (arg0: Levers) => void;
}

function LeverForm(props: LeverFormProps) {
  const { handleSubmit } = props;
  const [demands, setDemands] = useState<number>(100);
  const [carryover, setCarryover] = useState<string>("0");
  const [priority, setPriority] = useState<string>("0");
  const [delta, setDelta] = useState<string>("1");
  const [minflow, setMinflow] = useState<number>(0);

  const [minimized, setMinimized] = useState<boolean>(false);

  const submission = () => {
    let adjustedMinflow = "0";
    switch (minflow) {
      case 1:
        adjustedMinflow = "0";
        break;
      case 2:
        adjustedMinflow = "0.4";
        break;
      case 3:
        adjustedMinflow = "0.6";
        break;
      case 4:
        adjustedMinflow = "0.7";
        break;
      case 5:
        adjustedMinflow = "0.8";
        break;
    }

    const levers: Levers = {
      demands: String(demands / 100.0),
      carryover: String(1 + parseInt(carryover) / 100.0),
      priority: priority,
      delta: delta,
      minflow: adjustedMinflow,
    };

    handleSubmit(levers);
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  useEffect(() => {
    console.log(minflow);
  }, [minflow]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(typeof(event.target.value));
    const { name, value } = event.target;

    switch (name) {
      case "demands":
        setDemands(parseInt(value));
        break;
      case "carryover":
        setCarryover(value);
        break;
      case "priority":
        setPriority(value);
        break;
      case "delta":
        setDelta(value);
        break;
      case "minflow":
        setMinflow(parseInt(value));
        break;
      default:
        break;
    }
  };

  const minflowSwitch = () => {
    switch (minflow) {
      case 2:
        return "40%";
      case 3:
        return "60%";
      case 4:
        return "70%";
      case 5:
        return "80%";
      default:
        return "Baseline";
    }
  };

  if (minimized) {
    return (
      <div style={styles.coreblockMin}>
        <p style={styles.miniHeader}>Agriculture Demands: {demands}</p>
        <p style={styles.miniHeader}>Carryover: {carryover}</p>
        <p style={styles.miniHeader}>Distribution Priority: {priority}</p>
        <p style={styles.miniHeader}>Delta Regulations: {delta}</p>
        <p style={styles.miniHeader}>
          Minimum Flow Requirements: {minflowSwitch()}
        </p>
        <button onClick={toggleMinimized}>minimize</button>
      </div>
    );
  } else {
    return (
      <div style={styles.coreblock}>
        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Agriculture Demands</p>
            <QButton
              headerText="Agriculture Demands"
              bodyText="this is an explanation of agriculture demands"
            />
          </div>
          <input
            type="range"
            name="demands"
            min={60}
            max={100}
            step={10}
            defaultValue={demands}
            onChange={handleChange}
          />
          <label htmlFor="demands">{demands}% of Baseline</label> <br />
        </div>

        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Carryover</p>
            <QButton
              headerText="Carryover"
              bodyText="this is an explanation of carryover"
            />
          </div>
          <input
            type="range"
            name="carryover"
            min={0}
            max={20}
            step={10}
            value={carryover}
            defaultValue={carryover}
            onChange={handleChange}
          />
          {carryover === "0" ? (
            <label htmlFor="carryover">Baseline</label>
          ) : (
            <label htmlFor="carryover">{carryover}% Increase</label>
          )}
          <br />
        </div>

        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Distribution Priority</p>
            <QButton
              headerText="Distribution Priority"
              bodyText="this is an explanation of distribution priority"
            />
          </div>
          <input
            type="radio"
            id="priority-0"
            name="priority"
            value="0"
            onChange={handleChange}
            defaultChecked
            required
          />
          <label htmlFor="0">existing tiers for allocation cuts</label> <br />
          <input
            type="radio"
            id="priority-1"
            name="priority"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="1">shortages shared equally</label>
        </div>

        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Delta Regulations</p>
            <QButton
              headerText="Delta Regulations"
              bodyText="this is an explanation of delta regulations"
            />
          </div>
          <input
            type="radio"
            id="delta-1"
            name="delta"
            value="1"
            onChange={handleChange}
            defaultChecked
            required
          />
          <label htmlFor="1">Baseline, all D1641 regulations in place</label>{" "}
          <br />
          <input
            type="radio"
            id="delta-2"
            name="delta"
            value="2"
            onChange={handleChange}
            required
          />
          <label htmlFor="2">
            No flow reqt, NDO and Rio Vista flows turned off
          </label>{" "}
          <br />
          <input
            type="radio"
            id="delta-3"
            name="delta"
            value="3"
            onChange={handleChange}
            required
          />
          <label htmlFor="3">
            No salinity reqt, station salinity & X2 requirements off
          </label>{" "}
          <br />
          <input
            type="radio"
            id="delta-4"
            name="delta"
            value="4"
            onChange={handleChange}
            required
          />
          <label htmlFor="4">No D1641 flow or salinity requirements</label>
        </div>

        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Minimum Flow Requirements</p>
            <QButton
              headerText="Minimum Flow Requirements"
              bodyText="this is an explanation of minimum flow requirements"
            />
          </div>
          <input
            type="range"
            name="minflow"
            min={1}
            max={5}
            step={1}
            value={minflow}
            defaultValue={minflow}
            onChange={handleChange}
          />
          <div>{minflowSwitch()} unimpaired flow requirement</div>
        </div>

        <button onClick={submission}>Submit</button>
        <button onClick={toggleMinimized}>minimize</button>
      </div>
    );
  }
}

export default LeverForm;

const styles = {
  coreblock: {
    backgroundColor: "rgb(240, 240, 250)",
    margin: "5px",
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "1rem",
    gridColumn: "1 / -1",
  } as Style,
  coreblockMin: {
    backgroundColor: "rgb(240, 240, 250)",
    margin: "5px",
    padding: "0px 10px 0px 10px",
    display: "flex",
    flexDirection: "row",
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
};
