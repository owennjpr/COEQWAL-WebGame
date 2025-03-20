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
  const [manualOverride, setManualOverride] = useState<boolean>(false);
  const [fetchFailed, setFetchFailed] = useState<boolean>(false);

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
        try {
          const data = await axios.post(
            `${process.env.REACT_APP_API_URL}/submi`,
            levers
          );

          setDataState(data.data.ds);
          setCompareState(data.data.prev_compare);
          setWarnings(data.data.warnings);
          setLoading(false);
          setFetchFailed(false);
          setManualOverride(false);
        } catch {
          console.error("something went wrong, trying again");
          if (!manualOverride) {
            setFetchFailed(true);
            fetchData();
          } else {
            setLoading(false);
            setFetchFailed(false);
            setManualOverride(false);
          }
        }
      }
    };

    fetchData();
  }, [levers, manualOverride]);

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
      {loading ? (
        <LoadingSpinner
          setManualOverride={setManualOverride}
          fetchError={fetchFailed}
        />
      ) : null}
    </div>
  );
};

export default App;
