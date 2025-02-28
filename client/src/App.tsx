import React, { useEffect, useState } from "react";
import LeverForm from "./Components/LeverForm";
import axios from "axios";
import MetricsBlock from "./Components/MetricsBlock";
import ReservoirBlock from "./Components/ReservoirBlock";
import ControlBar from "./Components/ControlBar";
import TutorialPopUp from "./Components/TutorialPopUp";

import {
  DataState,
  CompareState,
  Warnings,
  nullWarnings,
  neutralCompare,
  emptyDataState,
  Levers,
} from "./types";

const App = () => {
  const [levers, setLevers] = useState<Levers>(null);
  const [dataState, setDataState] = useState<DataState>(emptyDataState);
  const [compareState, setCompareState] =
    useState<CompareState>(neutralCompare);
  const [warnings, setWarnings] = useState<Warnings>(nullWarnings);
  const [waterYearType, setWaterYearType] = useState<string>("dry");
  const [compareType, setCompareType] = useState<string>("previous");

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gridTemplateRows: "0.1fr 1fr",
    },
  };

  const handleSubmit = (res: Levers) => {
    setLevers(res);
  };

  const handleWYT = (wyt: string) => {
    setWaterYearType(wyt);
  };

  const handleCompareType = async (compare: string) => {
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/compare`, {
      compare: compare,
    });
    setCompareState(data.data.compare);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (levers) {
        const data = await axios.post(
          `${process.env.REACT_APP_API_URL}/submit`,
          levers
        );

        setDataState(data.data.ds);
        setCompareState(data.data.prev_compare);
        setWarnings(data.data.warnings);
      }
    };

    fetchData();
  }, [levers]);
  return (
    <div>
      <TutorialPopUp />
      <LeverForm handleSubmit={handleSubmit}></LeverForm>

      {!dataState.scenario ? (
        <p>No data to display</p>
      ) : (
        <div style={styles.container}>
          <ControlBar
            scenario={dataState.scenario}
            compareType={compareType}
            setCompareType={setCompareType}
            handleWYT={handleWYT}
            handleCompareType={handleCompareType}
            warnings={warnings}
          />
          <ReservoirBlock
            wyt={waterYearType}
            ds={dataState}
            compare={compareState}
          />
          <MetricsBlock
            wyt={waterYearType}
            ds={dataState}
            compare={compareState}
          />
        </div>
      )}
    </div>
  );
};

export default App;
