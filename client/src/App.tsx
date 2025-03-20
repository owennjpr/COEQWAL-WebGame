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
import LoadingSpinner from "./Components/LoadingSpinner";

const App = () => {
  const [levers, setLevers] = useState<Levers>(null);
  const [dataState, setDataState] = useState<DataState>(emptyDataState);
  const [compareState, setCompareState] =
    useState<CompareState>(neutralCompare);
  const [warnings, setWarnings] = useState<Warnings>(nullWarnings);
  const [compareType, setCompareType] = useState<string>("previous");
  const [minimized, setMinimized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = (res: Levers) => {
    setLevers(res);
  };

  const handleCompareType = async (compare: string) => {
    setLoading(true);
    const data = await axios.post(`${process.env.REACT_APP_API_URL}/compare`, {
      compare: compare,
    });
    setCompareState(data.data.compare);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (levers) {
        setLoading(true);
        const data = await axios.post(
          `${process.env.REACT_APP_API_URL}/submit`,
          levers
        );

        setDataState(data.data.ds);
        setCompareState(data.data.prev_compare);
        setWarnings(data.data.warnings);
        setLoading(false);
      }
    };

    fetchData();
  }, [levers]);

  return (
    <div>
      <TutorialPopUp />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <LeverForm
          handleSubmit={handleSubmit}
          minimized={minimized}
          setMinimized={setMinimized}
        ></LeverForm>

        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <ControlBar
            scenario={dataState.scenario}
            minimized={minimized}
            setMinimized={setMinimized}
            compareType={compareType}
            setCompareType={setCompareType}
            handleCompareType={handleCompareType}
            warnings={warnings}
          />
          {!dataState.scenario ? null : (
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <ReservoirBlock ds={dataState} compare={compareState} />
              <MetricsBlock ds={dataState} compare={compareState} />
            </div>
          )}
        </div>
      </div>
      {loading ? <LoadingSpinner /> : null}
    </div>
  );
};

export default App;
