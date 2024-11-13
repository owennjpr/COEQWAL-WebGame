export type DataState = {
  scenario: string;
  // Levers
  lev_demands: number;
  lev_carryover: number;
  lev_priority: number;
  lev_delta: number;
  lev_minflow: number;

  // Reservoirs
  dry_s_trinity: { val: number; prob: number }[];
  wet_s_trinity: { val: number; prob: number }[];
  dry_s_shasta: { val: number; prob: number }[];
  wet_s_shasta: { val: number; prob: number }[];
  dry_s_oroville: { val: number; prob: number }[];
  wet_s_oroville: { val: number; prob: number }[];
  dry_s_folsom: { val: number; prob: number }[];
  wet_s_folsom: { val: number; prob: number }[];
  dry_s_newmelones: { val: number; prob: number }[];
  wet_s_newmelones: { val: number; prob: number }[];
  dry_s_millerton: { val: number; prob: number }[];
  wet_s_millerton: { val: number; prob: number }[];

  // Summary Metrics
  dry_equity: number;
  wet_equity: number;

  // Deliveries
  dry_del_ag_n: { val: number; prob: number }[];
  wet_del_ag_n: { val: number; prob: number }[];
  dry_del_ag_s: { val: number; prob: number }[];
  wet_del_ag_s: { val: number; prob: number }[];
  dry_del_mi_n: { val: number; prob: number }[];
  wet_del_mi_n: { val: number; prob: number }[];
  dry_del_mi_s: { val: number; prob: number }[];
  wet_del_mi_s: { val: number; prob: number }[];

  // Delta Salinity
  dry_x2_prv: { val: number; prob: number }[];
  wet_x2_prv: { val: number; prob: number }[];
};

export const emptyDataState: DataState = {
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

export type CompareState = {
  // Scenario
  scenario: string;

  // Levers
  lev_demands: number;
  lev_carryover: number;
  lev_priority: number;
  lev_delta: number;
  lev_minflow: number;

  // Reservoirs
  dry_s_trinity: number;
  wet_s_trinity: number;
  dry_s_shasta: number;
  wet_s_shasta: number;
  dry_s_oroville: number;
  wet_s_oroville: number;
  dry_s_folsom: number;
  wet_s_folsom: number;
  dry_s_newmelones: number;
  wet_s_newmelones: number;
  dry_s_millerton: number;
  wet_s_millerton: number;

  // Summary Metrics
  dry_equity: number;
  dry_equity_value: number;
  wet_equity: number;
  wet_equity_value: number;

  // Deliveries
  dry_del_ag_n: number;
  wet_del_ag_n: number;
  dry_del_ag_s: number;
  wet_del_ag_s: number;
  dry_del_mi_n: number;
  wet_del_mi_n: number;
  dry_del_mi_s: number;
  wet_del_mi_s: number;

  // Delta Salinity
  dry_x2_prv: number;
  wet_x2_prv: number;
};

export const neutralCompare: CompareState = {
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

export type Warnings = {
  deltaAlertWet: boolean;
  deltaAlertDry: boolean;
  deltaCriticalWet: boolean;
  deltaCriticalDry: boolean;
  deliveriesNODWet: boolean;
  deliveriesNODDry: boolean;
  deliveriesSODWet: boolean;
  deliveriesSODDry: boolean;
  equityWet: boolean;
  equityDry: boolean;
  reservoirsWet: boolean;
  reservoirsDry: boolean;
};

export const nullWarnings: Warnings = {
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
