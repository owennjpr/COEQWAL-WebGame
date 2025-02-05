"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullWarnings = exports.neutralCompare = exports.emptyDataState = void 0;
exports.emptyDataState = {
    // Scenario
    scenario: "",
    // Levers
    lev_demands: 0,
    lev_carryover: 0,
    lev_priority: 0,
    lev_delta: 0,
    lev_minflow: 0,
    // Reservoirs
    dry_s_trinity: [],
    wet_s_trinity: [],
    dry_s_shasta: [],
    wet_s_shasta: [],
    dry_s_oroville: [],
    wet_s_oroville: [],
    dry_s_folsom: [],
    wet_s_folsom: [],
    dry_s_newmelones: [],
    wet_s_newmelones: [],
    dry_s_millerton: [],
    wet_s_millerton: [],
    // Summary Metrics
    dry_equity: 0,
    wet_equity: 0,
    // Deliveries
    dry_del_ag_n: [],
    wet_del_ag_n: [],
    dry_del_ag_s: [],
    wet_del_ag_s: [],
    dry_del_mi_n: [],
    wet_del_mi_n: [],
    dry_del_mi_s: [],
    wet_del_mi_s: [],
    // Delta Salinity
    dry_x2_prv: [],
    wet_x2_prv: [],
};
exports.neutralCompare = {
    // Scenario
    scenario: "",
    // Levers
    lev_demands: 0,
    lev_carryover: 0,
    lev_priority: 0,
    lev_delta: 0,
    lev_minflow: 0,
    // Reservoirs
    dry_s_trinity: 0,
    wet_s_trinity: 0,
    dry_s_shasta: 0,
    wet_s_shasta: 0,
    dry_s_oroville: 0,
    wet_s_oroville: 0,
    dry_s_folsom: 0,
    wet_s_folsom: 0,
    dry_s_newmelones: 0,
    wet_s_newmelones: 0,
    dry_s_millerton: 0,
    wet_s_millerton: 0,
    // Summary Metrics
    dry_equity: 0,
    dry_equity_value: 0,
    wet_equity: 0,
    wet_equity_value: 0,
    // Deliveries
    dry_del_ag_n: 0,
    wet_del_ag_n: 0,
    dry_del_ag_s: 0,
    wet_del_ag_s: 0,
    dry_del_mi_n: 0,
    wet_del_mi_n: 0,
    dry_del_mi_s: 0,
    wet_del_mi_s: 0,
    // Delta Salinity
    dry_x2_prv: 0,
    wet_x2_prv: 0,
};
exports.nullWarnings = {
    deltaAlertWet: false,
    deltaAlertDry: false,
    deltaCriticalWet: false,
    deltaCriticalDry: false,
    deliveriesNODWet: false,
    deliveriesNODDry: false,
    deliveriesSODWet: false,
    deliveriesSODDry: false,
    equityWet: false,
    equityDry: false,
    reservoirsWet: false,
    reservoirsDry: false,
};
