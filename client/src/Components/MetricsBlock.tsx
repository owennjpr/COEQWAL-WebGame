import React from "react";
import DeltaSalinityVisual from "./DeltaSalinityVisual";
import EquityBar from "./EquityBar";
import { CompareState, DataState } from "../types";
import DeltaPopup from "./DeltaPopup";

interface MetricsBlockProps {
  ds: DataState;
  compare: CompareState;
}

function MetricsBlock(props: MetricsBlockProps) {
  const { ds, compare } = props;
  const styles = {
    deliverybox: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
    },
    coreblock: {
      width: "100%",
      margin: "5px",
      padding: "10px",
      display: "block",
    },
    headerText: {
      textAlign: "center",
      margin: "10px",
      fontWeight: "bold",
    },
  };

  if (ds === undefined || compare === undefined) {
    return <div style={styles.coreblock} />;
  } else {
    return (
      <div style={styles.coreblock}>
        <EquityBar
          data_dry={ds.dry_equity}
          data_wet={ds.wet_equity}
          compare_dry={compare.dry_equity_value}
          compare_wet={compare.wet_equity_value}
        />
        <DeltaPopup
          deltaVis={
            <DeltaSalinityVisual
              title="Delta Salinity"
              data_dry={ds.dry_x2_prv}
              data_wet={ds.wet_x2_prv}
              compare_dry={compare.dry_x2_prv}
              compare_wet={compare.wet_x2_prv}
              w={"50px"}
              h={"100%"}
            />
          }
        />
      </div>
    );
  }
}

export default MetricsBlock;
