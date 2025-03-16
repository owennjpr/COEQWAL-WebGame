import React from "react";
import DeltaSalinityVisual from "./DeltaSalinityVisual";
import EquityBar from "./EquityBar";
import { CompareState, DataState } from "../types";

interface MetricsBlockProps {
  wyt: string;
  ds: DataState;
  compare: CompareState;
}

function MetricsBlock(props: MetricsBlockProps) {
  const { wyt, ds, compare } = props;
  const styles = {
    deliverybox: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr",
    },
    coreblock: {
      backgroundColor: "rgb(240, 240, 250)",
      marginTop: "5px",
      marginBottom: "5px",
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
        <EquityBar data={ds.dry_equity} compare={compare.dry_equity_value} />

        <DeltaSalinityVisual
          title="Delta Salinity"
          data_dry={ds.dry_x2_prv}
          data_wet={ds.wet_x2_prv}
          compare_dry={compare.dry_x2_prv}
          compare_wet={compare.wet_x2_prv}
          w={"5vmin%"}
          h={"40vmin"}
        />
      </div>
    );
  }
}

export default MetricsBlock;
