import React, { CSSProperties, useEffect, useState } from "react";
import { Levers } from "../types";
import QButton from "./QButton";

type Style = CSSProperties;

interface LeverFormProps {
  handleSubmit: (arg0: Levers) => void;
  minimized: boolean;
  setMinimized: (arg0: boolean) => void;
}

function LeverForm(props: LeverFormProps) {
  const { handleSubmit, minimized, setMinimized } = props;
  const [demands, setDemands] = useState<number>(100);
  const [carryover, setCarryover] = useState<string>("0");
  const [priority, setPriority] = useState<string>("0");
  const [delta, setDelta] = useState<string>("1");
  const [minflow, setMinflow] = useState<number>(0);

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
    return null;
  } else {
    return (
      <div style={styles.coreblock}>
        <div className="buttonBorder">
          <button onClick={toggleMinimized} className="buttonInner">
            minimize
          </button>
        </div>

        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Agriculture Demands</p>
            <QButton
              headerText="Agriculture Demands"
              bodyText={
                <div>
                  Changing agriculture demands modifies the model's assumptions
                  about crop water requirements, which can reflect shifts in
                  cropping patterns, irrigation efficiency improvements, climate
                  change impacts, or land use conversions. These demand changes
                  directly affect the model's water allocation calculations, as
                  agricultural users represent the largest category of water
                  consumption in California's Central Valley. <br />
                  <br /> When agricultural demands are reduced in - such as
                  through improved irrigation efficiency or fallowing of
                  farmland - it generally results in increased water
                  availability for other uses, higher reservoir storage levels,
                  and improved ability to meet environmental flow requirements
                  during dry periods. Conversely, increasing agricultural
                  demands typically leads to greater competition for limited
                  water supplies, reduced deliveries to junior water rights
                  holders during shortages, and increased pressure on
                  reservoirs. <br />
                  <br /> These scenarios are crucial for water planners to
                  evaluate how changes in farming practices, drought response
                  policies, or long-term agricultural trends might affect the
                  overall reliability and sustainability of California's water
                  system.
                </div>
              }
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
              bodyText={
                <div>
                  Carryover reservoir storage refers to the water held in
                  reservoirs at the end of a water year that is intentionally
                  retained to provide supply security for the following year.
                  This stored water serves as a critical buffer against
                  hydrologic uncertainty, ensuring that water managers have
                  supplies available even if the next year brings below-normal
                  precipitation or extended drought conditions. <br /> <br />
                  Carryover storage decisions require balancing current water
                  demands against future risks, as releasing too much water in
                  the present year could leave the system vulnerable to
                  shortages, while holding too much water might mean missing
                  opportunities to meet immediate needs or generate
                  hydroelectric power.
                </div>
              }
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
            <p style={styles.miniHeader}>Minimum Flow Requirements</p>
            <QButton
              headerText="Minimum Flow Requirements"
              bodyText={
                <div>
                  Minimum flow requirements in California Central Valley rivers
                  are legally mandated water releases designed to protect fish
                  habitat, maintain water quality, and preserve ecosystem
                  functions during critical periods. These flows are typically
                  established through environmental regulations, water rights
                  conditions, or biological opinions issued under the Endangered
                  Species Act to protect threatened species like salmon,
                  steelhead, and delta smelt. <br />
                  <br />
                  Meeting these minimum flows can create significant challenges
                  for water managers, particularly during dry years when storage
                  is limited and competing demands are high, often requiring
                  difficult trade-offs between environmental protection and
                  water deliveries to agricultural and urban users.
                </div>
              }
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

        <div>
          <div style={styles.titleQPair}>
            <p style={styles.miniHeader}>Distribution Priority</p>
            <QButton
              headerText="Distribution Priority"
              bodyText={
                <div>
                  The CalSim model prioritizes water deliveries based on
                  established water right priorities, with environmental flow
                  requirements and settlement contract obligations typically
                  receiving high priority, followed by municipal and industrial
                  users, and agricultural contractors receiving varying priority
                  levels depending on their specific contract types and
                  seniority.
                </div>
              }
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
              bodyText={
                <div>
                  The California Delta is regulated through water quality
                  standards that control salinity levels, most notably through
                  the "X2" standard - the point identified by its distance from
                  the Golden Gate Bridge where salinity at the river's bottom is
                  about 2 parts per thousand (ppt). Salinity in the Delta is
                  regulated to protect municipal and industrial, agricultural,
                  and fish and wildlife uses, and if the saltwater intrudes too
                  far into the Delta, it can make the water unusable. <br />
                  <br />
                  The State Water Resources Control Board sets these standards
                  through the Bay Delta Water Quality Control Plan, which
                  establishes minimum freshwater flow requirements and maximum
                  salinity levels at various monitoring stations throughout the
                  Delta.
                  <br />
                  <br />
                  When these regulations are changed - such as requiring X2 to
                  be maintained further upstream (lower km distance from the
                  Golden Gate) - it typically requires increased freshwater
                  releases from upstream reservoirs, which reduces water
                  available for other uses but provides better habitat
                  conditions for endangered fish species like delta smelt and
                  improves water quality for agricultural and municipal users
                  downstream.
                </div>
              }
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
        <div className="buttonBorder">
          <button
            onClick={() => {
              submission();
              setMinimized(true);
            }}
            className="buttonInner"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default LeverForm;

const styles = {
  coreblock: {
    backgroundColor: "#FFFFFF70",
    backdropFilter: "blur(8px)",
    // border: "black 1px solid",
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 10px rgb(213, 213, 213)",
    width: "25vmin",
    height: "full",
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
};
