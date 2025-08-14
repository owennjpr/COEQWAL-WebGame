import React, { useEffect, useState } from "react";
import WarningSymbol from "../svgs/WarningSymbol";
import { Warnings } from "../types";

interface WarningsListProps {
  warnings: Warnings | null;
  renderWarningItem?: (warningText: string, index: number) => React.ReactNode;
}

const WarningsList = (props: WarningsListProps) => {
  const { warnings, renderWarningItem } = props;
  const [warningList, setWarningList] = useState<string[]>([]);

  useEffect(() => {
    if (warnings) {
      let warn_iter: string[] = [];
      if (warnings.deliveriesNODDry) {
        warn_iter.push(
          "Northern deliveries not met during dry years. When deliveries are in danger of not being met, water managers implement allocation cuts, declare shortage conditions, and may require emergency conservation measures or alternative supply sources to prevent critical shortages."
        );
      }
      if (warnings.deliveriesNODWet) {
        warn_iter.push(
          "Northern deliveries not met during wet years. When deliveries are in danger of not being met, water managers implement allocation cuts, declare shortage conditions, and may require emergency conservation measures or alternative supply sources to prevent critical shortages."
        );
      }

      if (warnings.deliveriesSODDry) {
        warn_iter.push(
          "Southern deliveries not met during dry years. When deliveries are in danger of not being met, water managers implement allocation cuts, declare shortage conditions, and may require emergency conservation measures or alternative supply sources to prevent critical shortages."
        );
      }

      if (warnings.deliveriesSODWet) {
        warn_iter.push(
          "Southern deliveries not met during wet years. When deliveries are in danger of not being met, water managers implement allocation cuts, declare shortage conditions, and may require emergency conservation measures or alternative supply sources to prevent critical shortages."
        );
      }

      if (warnings.deltaAlertDry) {
        warn_iter.push(
          "High Delta Salinity levels during wet years. Water becomes unsuitable for agricultural irrigation and municipal use, fish habitat is degraded, and additional freshwater releases from upstream reservoirs are required to push the saltwater intrusion back toward San Francisco Bay."
        );
      }

      if (warnings.deltaAlertWet) {
        warn_iter.push(
          "High Delta Salinity levels during wet years. Water becomes unsuitable for agricultural irrigation and municipal use, fish habitat is degraded, and additional freshwater releases from upstream reservoirs are required to push the saltwater intrusion back toward San Francisco Bay."
        );
      }

      if (warnings.deltaCriticalDry) {
        warn_iter.push(
          "Very high Delta Salinity levels during dry years. Salinity can contaminate municipal water supplies, destroy agricultural crops, and severely degrade freshwater fish habitat."
        );
      }

      if (warnings.deltaCriticalWet) {
        warn_iter.push(
          "Very high Delta Salinity levels during wet years. Salinity can contaminate municipal water supplies, destroy agricultural crops, and severely degrade freshwater fish habitat."
        );
      }

      if (warnings.equityDry) {
        warn_iter.push("warning equity dry years");
      }

      if (warnings.equityWet) {
        warn_iter.push("warning equity wet years");
      }

      if (warnings.reservoirsDry) {
        warn_iter.push(
          "Reservoirs are underfilled during dry years. Water managers may need to implement allocation cuts, reduce environmental flows, or risk not having adequate carryover storage to meet demands if dry conditions continue."
        );
      }

      if (warnings.reservoirsWet) {
        warn_iter.push(
          "Reservoirs are underfilled during dry years. Water managers may need to implement allocation cuts, reduce environmental flows, or risk not having adequate carryover storage to meet demands if dry conditions continue."
        );
      }

      setWarningList(warn_iter);
    }
  }, [warnings]);

  const defaultWarningItem = (warningText: string, index: number) => (
    <div
      key={index}
      className="buttonBorder"
      style={{ marginTop: 10, marginBottom: 10 }}
    >
      <div style={styles.warningBox}>
        <WarningSymbol style={styles.warnSymbol} />
        <p style={{ fontSize: "0.8rem", color: "#666" }}>{warningText}</p>
      </div>
    </div>
  );

  return (
    <>
      {warningList.map((item, index) =>
        renderWarningItem
          ? renderWarningItem(item, index)
          : defaultWarningItem(item, index)
      )}
    </>
  );
};

const styles = {
  warningBox: {
    backgroundColor: "#FFFFFF",
    // boxShadow: "0px 0px 6px rgb(180, 180, 180)",
    display: "flex",
    // : "row",
    alignItems: "center",
    gap: 10,
    border: "white solid 1px",
    borderRadius: "0.5rem",
    paddingLeft: 5,
    paddingRight: 5,
  },
  warnSymbol: {
    color: "rgb(255, 195, 15)",
    minWidth: "16px",
    minHeight: "16px",
    flexShrink: 0,
  },
};

export default WarningsList;
