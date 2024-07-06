import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "COEQWAL",
    password: "gr3pw()rd!",
    port: 5432,
  });
  db.connect();
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const trinity_capacity = 2447.7;
const shasta_capacity = 4552;
const oroville_capacity = 3538;
const folsom_capacity = 977;
const newmelones_capacity = 2420;
const millerton_capacity = 520;

const ag_n_maximum = 4585.4586;
const ag_s_maximum = 9168.7748;
const mi_n_maximum = 462.13282;
const mi_s_maximum = 7268.1163;

const prev_runs = [];
var curr_run = 0;

var ds = {
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
}

var prev_compare = {
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
}

var warnings = {
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
}


app.get("/", (req, res) => {
    res.render("index.ejs");
})

// SELECT expl0000 / total_rows AS divided_value
// FROM del_cvp_pag_n, (SELECT COUNT(*) AS total_rows FROM del_cvp_pag_n WHERE wyt = 'wet') AS row_count
// WHERE wyt = 'wet';
const tableQuery = async (scenario, wyt, tableName) => {
    const result = await db.query(`SELECT AVG(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}'`);
    return result.rows[0].avg;
}

const tableExceedanceQuery = async (scenario, wyt, tableName) => {
    // const result = await db.query(`SELECT SUM(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}' GROUP BY yr ORDER BY SUM(${scenario}) DESC`);
    const result = await db.query(`SELECT AVG(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}' GROUP BY yr ORDER BY AVG(${scenario}) DESC`);
    const len = result.rows.length;
    const yrly_avgs = result.rows.map((row) => {
        // console.log(row.sum);
        return row.avg;
    });
    let index = 0;
    const exceedance = yrly_avgs.map((avg) => {
        index += 1;

        // console.log(100 * (index / parseFloat(len + 1.0)));
        return 100 * (index / parseFloat(len + 1.0));
     
    });

    const mk10 = Math.floor(len / 10);
    const mk30 = Math.floor(len * 3 / 10);
    const mk50 = Math.floor(len / 2);
    const mk70 = Math.floor(len * 7 / 10);
    const mk90 = Math.floor(len * 9 / 10);

    // console.log(yrly_avgs[mk10].toFixed(2));
    // console.log(yrly_avgs[mk30].toFixed(2));
    // console.log(yrly_avgs[mk50].toFixed(2));
    // console.log(yrly_avgs[mk70].toFixed(2));
    // console.log(yrly_avgs[mk90].toFixed(2));

    const values = [
        {val: yrly_avgs[mk10].toFixed(2), prob: exceedance[mk10].toFixed(2)}, 
        {val: yrly_avgs[mk30].toFixed(2), prob: exceedance[mk30].toFixed(2)}, 
        {val: yrly_avgs[mk50].toFixed(2), prob: exceedance[mk50].toFixed(2)},
        {val: yrly_avgs[mk70].toFixed(2), prob: exceedance[mk70].toFixed(2)},
        {val: yrly_avgs[mk90].toFixed(2), prob: exceedance[mk90].toFixed(2)}];

    return values; 
}

const getNewDS = async (scenario) => {
    ds.scenario = scenario;

    ds.dry_s_trinity = (await tableExceedanceQuery(ds.scenario, "dry", "s_trinity")).map((step) =>{
        return {val: (step.val / trinity_capacity).toFixed(4), prob: step.prob};
    });
    ds.wet_s_trinity = (await tableExceedanceQuery(ds.scenario, "wet", "s_trinity")).map((step) =>{
        return {val: (step.val / trinity_capacity).toFixed(4), prob: step.prob};
    });

    ds.dry_s_shasta = (await tableExceedanceQuery(ds.scenario, "dry", "s_shasta")).map((step) =>{
        return {val: (step.val / shasta_capacity).toFixed(4), prob: step.prob};
    });
    ds.wet_s_shasta = (await tableExceedanceQuery(ds.scenario, "wet", "s_shasta")).map((step) =>{
        return {val: (step.val / shasta_capacity).toFixed(4), prob: step.prob};
    });

    ds.dry_s_oroville = (await tableExceedanceQuery(ds.scenario, "dry", "s_oroville")).map((step) =>{
        return {val: (step.val / oroville_capacity).toFixed(4), prob: step.prob};
    });
    ds.wet_s_oroville = (await tableExceedanceQuery(ds.scenario, "wet", "s_oroville")).map((step) =>{
        return {val: (step.val / oroville_capacity).toFixed(4), prob: step.prob};
    });

    ds.dry_s_folsom = (await tableExceedanceQuery(ds.scenario, "dry", "s_folsom")).map((step) =>{
        return {val: (step.val / folsom_capacity).toFixed(4), prob: step.prob};
    });
    ds.wet_s_folsom = (await tableExceedanceQuery(ds.scenario, "wet", "s_folsom")).map((step) =>{
        return {val: (step.val / folsom_capacity).toFixed(4), prob: step.prob};
    });
    
    ds.dry_s_newmelones = (await tableExceedanceQuery(ds.scenario, "dry", "s_newmelones")).map((step) =>{
        return {val: (step.val / newmelones_capacity).toFixed(4), prob: step.prob};
    });
    ds.wet_s_newmelones = (await tableExceedanceQuery(ds.scenario, "wet", "s_newmelones")).map((step) =>{
        return {val: (step.val / newmelones_capacity).toFixed(4), prob: step.prob};
    });

    ds.dry_s_millerton = (await tableExceedanceQuery(ds.scenario, "dry", "s_millerton")).map((step) =>{
        return {val: (step.val / millerton_capacity).toFixed(4), prob: step.prob};
    });
    ds.wet_s_millerton = (await tableExceedanceQuery(ds.scenario, "wet", "s_millerton")).map((step) =>{
        return {val: (step.val / millerton_capacity).toFixed(4), prob: step.prob};
    });


    // EQUITY
    const dry_equity_results = await db.query("SELECT equity FROM summary_metrics_dry_6_5_24 WHERE scenario = $1;", [ds.scenario]);
    ds.dry_equity = dry_equity_results.rows[0].equity.toFixed(4);

    const wet_equity_results = await db.query("SELECT equity FROM summary_metrics_wet_6_5_24 WHERE scenario = $1;", [ds.scenario]);
    ds.wet_equity = wet_equity_results.rows[0].equity.toFixed(4);

    // AG DELIVERIES
    // north
    ds.dry_del_ag_n = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_ag_n")).map((step) => {
        return {val: (step.val / ag_n_maximum).toFixed(4), prob: step.prob};
    });

    ds.wet_del_ag_n = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_ag_n")).map((step) => {
        return {val: (step.val / ag_n_maximum).toFixed(4), prob: step.prob};
    });

    // // south
    ds.dry_del_ag_s = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_ag_s")).map((step) => {
        return {val: (step.val / ag_s_maximum).toFixed(4), prob: step.prob};
    });

    ds.wet_del_ag_s = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_ag_s")).map((step) => {
        return {val: (step.val / ag_s_maximum).toFixed(4), prob: step.prob};
    });

    // M&I DELIVERIES
    // north
    ds.dry_del_mi_n = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_mi_n")).map((step) => {
        return {val: (step.val / mi_n_maximum).toFixed(4), prob: step.prob};
    });

    ds.wet_del_mi_n = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_mi_n")).map((step) => {
        return {val: (step.val / mi_n_maximum).toFixed(4), prob: step.prob};
    });

    // // south
    ds.dry_del_mi_s = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_mi_s")).map((step) => {
        return {val: (step.val / mi_s_maximum).toFixed(4), prob: step.prob};
    });

    ds.wet_del_mi_s = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_mi_s")).map((step) => {
        return {val: (step.val / mi_s_maximum).toFixed(4), prob: step.prob};
    });

    // DELTA SALINITY
    ds.wet_x2_prv = await tableExceedanceQuery(ds.scenario, "wet", "x2_prv");
    ds.dry_x2_prv = await tableExceedanceQuery(ds.scenario, "dry", "x2_prv");
}

const compareExceedance = (curr, prev) => {
    const currSum = curr[0].val + curr[1].val + curr[2].val + curr[3].val + curr[4].val;
    const prevSum = prev[0].val + prev[1].val + prev[2].val + prev[3].val + prev[4].val;
    if (currSum === prevSum) {
        return 0;
    } else {
        if (currSum > prevSum) {
            return 1;
        } else {
            return -1;
        }
    }
}

const compareLastRun = () => {
    const last_run = prev_runs[(prev_runs.length - 1)];

    prev_compare.scenario = last_run.scenario;
    prev_compare.lev_demands = last_run.lev_demands;
    prev_compare.lev_carryover = last_run.lev_carryover;
    prev_compare.lev_priority = last_run.lev_priority;
    prev_compare.lev_delta = last_run.lev_delta;
    prev_compare.lev_minflow = last_run.lev_minflow;
    
    prev_compare.dry_equity = (ds.dry_equity === last_run.dry_equity) ? 0 : (ds.dry_equity > last_run.dry_equity ? 1 : -1);
    prev_compare.wet_equity = (ds.wet_equity === last_run.wet_equity) ? 0 : (ds.wet_equity > last_run.wet_equity ? 1 : -1);
    prev_compare.dry_equity_value = last_run.dry_equity;
    prev_compare.wet_equity_value = last_run.wet_equity;

    prev_compare.dry_s_trinity = compareExceedance(ds.dry_s_trinity, last_run.dry_s_trinity);
    prev_compare.wet_s_trinity = compareExceedance(ds.wet_s_trinity, last_run.wet_s_trinity);

    prev_compare.dry_s_shasta = compareExceedance(ds.dry_s_shasta, last_run.dry_s_shasta);
    prev_compare.wet_s_shasta = compareExceedance(ds.wet_s_shasta, last_run.wet_s_shasta);

    prev_compare.dry_s_oroville = compareExceedance(ds.dry_s_oroville, last_run.dry_s_oroville);
    prev_compare.wet_s_oroville = compareExceedance(ds.wet_s_oroville, last_run.wet_s_oroville);

    prev_compare.dry_s_folsom = compareExceedance(ds.dry_s_folsom, last_run.dry_s_folsom);
    prev_compare.wet_s_folsom = compareExceedance(ds.wet_s_folsom, last_run.wet_s_folsom);

    prev_compare.dry_s_newmelones = compareExceedance(ds.dry_s_newmelones, last_run.dry_s_newmelones);
    prev_compare.wet_s_newmelones = compareExceedance(ds.wet_s_newmelones, last_run.wet_s_newmelones);

    prev_compare.dry_s_millerton = compareExceedance(ds.dry_s_millerton, last_run.dry_s_millerton);
    prev_compare.wet_s_millerton = compareExceedance(ds.wet_s_millerton, last_run.wet_s_millerton);

    prev_compare.dry_del_ag_n = compareExceedance(ds.dry_del_ag_n, last_run.dry_del_ag_n);
    prev_compare.wet_del_ag_n = compareExceedance(ds.wet_del_ag_n, last_run.wet_del_ag_n);
    prev_compare.dry_del_ag_s = compareExceedance(ds.dry_del_ag_s, last_run.dry_del_ag_s);
    prev_compare.wet_del_ag_s = compareExceedance(ds.wet_del_ag_s, last_run.wet_del_ag_s);

    prev_compare.dry_del_mi_n = compareExceedance(ds.dry_del_mi_n, last_run.dry_del_mi_n);
    prev_compare.wet_del_mi_n = compareExceedance(ds.wet_del_mi_n, last_run.wet_del_mi_n);
    prev_compare.dry_del_mi_s = compareExceedance(ds.dry_del_mi_s, last_run.dry_del_mi_s);
    prev_compare.wet_del_mi_s = compareExceedance(ds.wet_del_mi_s, last_run.wet_del_mi_s);

    prev_compare.dry_x2_prv = compareExceedance(last_run.dry_x2_prv, ds.dry_x2_prv);
    prev_compare.wet_x2_prv = compareExceedance(last_run.wet_x2_prv, ds.wet_x2_prv);
    return last_run;
}

const checkWarnings = () => {
    warnings.deliveriesNODDry = false;
    warnings.deliveriesNODWet = false;
    warnings.deliveriesSODDry = false;
    warnings.deliveriesSODWet = false;
    warnings.deltaAlertDry = false;
    warnings.deltaAlertWet = false;
    warnings.deltaCriticalDry = false;
    warnings.deltaCriticalWet = false;
    warnings.equityDry = (ds.dry_equity < 0.6);
    warnings.equityWet = (ds.wet_equity < 0.6);
    warnings.reservoirsDry = false;
    warnings.reservoirsWet = false;

}

app.post("/submit", async (req, res) => {
    const levers = req.body;
    ds.lev_demands = levers["demands"];
    ds.lev_carryover = levers["carryover"];
    ds.lev_priority = levers["priority"];
    ds.lev_delta = levers["delta"];
    ds.lev_minflow = levers["minflow"];

    const result = await db.query('SELECT "Scenario" FROM "CalLite_Levers" WHERE d = $1 AND c = $2 AND p = $3 AND r = $4 AND m = $5;',
        [
            ds.lev_demands,
            ds.lev_carryover,
            ds.lev_priority,
            ds.lev_delta,
            ds.lev_minflow
        ]
    )

    await getNewDS(result.rows[0].Scenario);

    checkWarnings();
    // check previous runs here
    let last_run_comparison = prev_compare;
    if (curr_run !== 0) {
        const last_run_comparison = compareLastRun();
    }
    // append new run
    prev_runs.push(JSON.parse(JSON.stringify(ds)));
    curr_run += 1;

    res.render("index.ejs", {
        ds: ds,
        prev_compare: last_run_comparison,
        warnings: warnings,
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });