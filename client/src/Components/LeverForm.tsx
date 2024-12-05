import React, { CSSProperties, useState } from "react";
import { Levers } from "../types";

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
  const [minflow, setMinflow] = useState<string>("0");

  const [minimized, setMinimized] = useState<boolean>(false);

  const submission = () => {
    const levers: Levers = {
      demands: String(demands / 100.0),
      carryover: String(1 + parseInt(carryover) / 100.0),
      priority: priority,
      delta: delta,
      minflow: minflow,
    };

    handleSubmit(levers);
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

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
        setMinflow(value);
        break;
      default:
        break;
    }
  };

  if (minimized) {
    return (
      <div style={styles.coreblockMin}>
        <p style={styles.miniHeader}>Agriculture Demands: {demands}</p>
        <p style={styles.miniHeader}>Carryover: {carryover}</p>
        <p style={styles.miniHeader}>Distribution Priority: {priority}</p>
        <p style={styles.miniHeader}>Delta Regulations: {delta}</p>
        <p style={styles.miniHeader}>Minimum Flow Requirements: {minflow}</p>
        <button onClick={toggleMinimized}>minimize</button>
      </div>
    );
  } else {
    return (
      <div style={styles.coreblock}>
        <div>
          <p style={styles.miniHeader}>Agriculture Demands</p>
          <input
            type="range"
            name="demands"
            min={60}
            max={100}
            step={10}
            defaultValue={100}
            onChange={handleChange}
          />
          <label htmlFor="demands">{demands}% of Baseline</label> <br />
        </div>

        <div>
          <p style={styles.miniHeader}>Carryover</p>
          <input
            type="range"
            name="carryover"
            min={0}
            max={20}
            step={10}
            value={carryover}
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
          <p style={styles.miniHeader}>Distribution Priority</p>
          <input
            type="radio"
            id="priority-0"
            name="priority"
            value="0"
            onChange={handleChange}
            defaultChecked
            required
          />
          <label htmlFor="0">
            Baseline using existing tiers for allocation cuts
          </label>{" "}
          <br />
          <input
            type="radio"
            id="priority-1"
            name="priority"
            value="1"
            onChange={handleChange}
            required
          />
          <label htmlFor="1">
            shortages are shared equally across contract types
          </label>
        </div>

        <div>
          <p style={styles.miniHeader}>Delta Regulations</p>
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
          <p style={styles.miniHeader}>Minimum Flow Requirements</p>
          <input
            type="radio"
            id="minflow-0"
            name="minflow"
            value="0"
            onChange={handleChange}
            defaultChecked
            required
          />
          <label htmlFor="0">
            Baseline, all pre-existing minimum flow requirements in place
          </label>{" "}
          <br />
          <input
            type="radio"
            id="minflow-0-4"
            name="minflow"
            value="0.4"
            onChange={handleChange}
            required
          />
          <label htmlFor="0.4">
            40% of unimpaired flow requirement takes place of existing minimum
            flows
          </label>{" "}
          <br />
          <input
            type="radio"
            id="minflow-0-6"
            name="minflow"
            value="0.6"
            onChange={handleChange}
            required
          />
          <label htmlFor="0.6">60% of unimpaired flow</label> <br />
          <input
            type="radio"
            id="minflow-0-7"
            name="minflow"
            value="0.7"
            onChange={handleChange}
            required
          />
          <label htmlFor="0.7">70% of unimpaired flow</label> <br />
          <input
            type="radio"
            id="minflow-0-8"
            name="minflow"
            value="0.8"
            onChange={handleChange}
            required
          />
          <label htmlFor="0.8">80% of unimpaired flow</label>
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
    padding: "10px",
    display: "flex",
    flexDirection: "row",
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
  } as Style,
};
