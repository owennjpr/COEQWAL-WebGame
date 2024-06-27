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
    console.log(scenario + ", " + wyt + ", " + tableName);
    const result = await db.query(`SELECT AVG(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}' GROUP BY yr ORDER BY AVG(${scenario}) DESC`);
    const len = result.rows.length;
    const yrly_avgs = result.rows.map((row) => {
        return row.avg;
    });
    let index = 0;
    const exceedance = yrly_avgs.map((avg) => {
        index += 1;
        return 100 * (index / parseFloat(len + 1.0));
     
    });

    const mk25 = Math.floor(len / 4);
    const mk50 = Math.floor(len / 2);
    const mk75 = Math.floor(len * 3 / 4);

    const values = [
        {val: yrly_avgs[mk25].toFixed(2), prob: exceedance[mk25].toFixed(2)}, 
        {val: yrly_avgs[mk50].toFixed(2), prob: exceedance[mk50].toFixed(2)},
        {val: yrly_avgs[mk75].toFixed(2), prob: exceedance[mk75].toFixed(2)}];

    return values; 
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

    ds.scenario = result.rows[0].Scenario;
    //RESERVOIRS

    ds.dry_s_trinity = (await tableExceedanceQuery(ds.scenario, "dry", "s_trinity")).map((step) =>{
        return {val: (step.val / trinity_capacity).toFixed(3), prob: step.prob};
    });
    ds.wet_s_trinity = (await tableExceedanceQuery(ds.scenario, "wet", "s_trinity")).map((step) =>{
        return {val: (step.val / trinity_capacity).toFixed(3), prob: step.prob};
    });

    ds.dry_s_shasta = (await tableExceedanceQuery(ds.scenario, "dry", "s_shasta")).map((step) =>{
        return {val: (step.val / shasta_capacity).toFixed(3), prob: step.prob};
    });
    ds.wet_s_shasta = (await tableExceedanceQuery(ds.scenario, "wet", "s_shasta")).map((step) =>{
        return {val: (step.val / shasta_capacity).toFixed(3), prob: step.prob};
    });

    ds.dry_s_oroville = (await tableExceedanceQuery(ds.scenario, "dry", "s_oroville")).map((step) =>{
        return {val: (step.val / oroville_capacity).toFixed(3), prob: step.prob};
    });
    ds.wet_s_oroville = (await tableExceedanceQuery(ds.scenario, "wet", "s_oroville")).map((step) =>{
        return {val: (step.val / oroville_capacity).toFixed(3), prob: step.prob};
    });

    ds.dry_s_folsom = (await tableExceedanceQuery(ds.scenario, "dry", "s_folsom")).map((step) =>{
        return {val: (step.val / folsom_capacity).toFixed(3), prob: step.prob};
    });
    ds.wet_s_folsom = (await tableExceedanceQuery(ds.scenario, "wet", "s_folsom")).map((step) =>{
        return {val: (step.val / folsom_capacity).toFixed(3), prob: step.prob};
    });
    
    ds.dry_s_newmelones = (await tableExceedanceQuery(ds.scenario, "dry", "s_newmelones")).map((step) =>{
        return {val: (step.val / newmelones_capacity).toFixed(3), prob: step.prob};
    });
    ds.wet_s_newmelones = (await tableExceedanceQuery(ds.scenario, "wet", "s_newmelones")).map((step) =>{
        return {val: (step.val / newmelones_capacity).toFixed(3), prob: step.prob};
    });

    ds.dry_s_millerton = (await tableExceedanceQuery(ds.scenario, "dry", "s_millerton")).map((step) =>{
        return {val: (step.val / millerton_capacity).toFixed(3), prob: step.prob};
    });
    ds.wet_s_millerton = (await tableExceedanceQuery(ds.scenario, "wet", "s_millerton")).map((step) =>{
        return {val: (step.val / millerton_capacity).toFixed(3), prob: step.prob};
    });


    // EQUITY
    const dry_equity_results = await db.query("SELECT equity FROM summary_metrics_dry_6_5_24 WHERE scenario = $1;", [ds.scenario]);
    ds.dry_equity = dry_equity_results.rows[0].equity;

    const wet_equity_results = await db.query("SELECT equity FROM summary_metrics_wet_6_5_24 WHERE scenario = $1;", [ds.scenario]);
    ds.wet_equity = wet_equity_results.rows[0].equity;

    // AG DELIVERIES
    // north
    // const dry_del_cvp_pag_n = await tableQuery(ds.scenario, "dry", "del_cvp_pag_n");
    // const dry_del_swp_pag_n = await tableQuery(ds.scenario, "dry", "del_swp_pag_n");
    // ds.dry_del_ag_n = (dry_del_cvp_pag_n + dry_del_swp_pag_n) / ag_n_maximum;
    ds.dry_del_ag_n = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_ag_n")).map((step) => {
        return {val: (step.val / ag_n_maximum).toFixed(3), prob: step.prob};
    });

    // const wet_del_cvp_pag_n = await tableQuery(ds.scenario, "wet", "del_cvp_pag_n");
    // const wet_del_swp_pag_n = await tableQuery(ds.scenario, "wet", "del_swp_pag_n");
    // ds.wet_del_ag_n = (wet_del_cvp_pag_n + wet_del_swp_pag_n) / ag_n_maximum;
    ds.wet_del_ag_n = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_ag_n")).map((step) => {
        return {val: (step.val / ag_n_maximum).toFixed(3), prob: step.prob};
    });

    // // south
    // const dry_del_cvp_pag_s = await tableQuery(ds.scenario, "dry", "del_cvp_pag_s");
    // const dry_del_swp_pag_s = await tableQuery(ds.scenario, "dry", "del_swp_pag_s");
    // ds.dry_del_ag_s = (dry_del_cvp_pag_s + dry_del_swp_pag_s) / ag_s_maximum;
    ds.dry_del_ag_s = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_ag_s")).map((step) => {
        return {val: (step.val / ag_s_maximum).toFixed(3), prob: step.prob};
    });

    // const wet_del_cvp_pag_s = await tableQuery(ds.scenario, "wet", "del_cvp_pag_s");
    // const wet_del_swp_pag_s = await tableQuery(ds.scenario, "wet", "del_swp_pag_s");
    // ds.wet_del_ag_s = (wet_del_cvp_pag_s + wet_del_swp_pag_s) / ag_s_maximum;
    ds.wet_del_ag_s = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_ag_s")).map((step) => {
        return {val: (step.val / ag_s_maximum).toFixed(3), prob: step.prob};
    });

    // M&I DELIVERIES
    // north
    // const dry_del_cvp_pmi_n = await tableQuery(ds.scenario, "dry", "del_cvp_pmi_n");
    // const dry_del_swp_pmi_n = await tableQuery(ds.scenario, "dry", "del_swp_pmi_n");
    // ds.dry_del_mi_n = (dry_del_cvp_pmi_n + dry_del_swp_pmi_n) / mi_n_maximum;
    ds.dry_del_mi_n = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_mi_n")).map((step) => {
        return {val: (step.val / mi_n_maximum).toFixed(3), prob: step.prob};
    });

    // const wet_del_cvp_pmi_n = await tableQuery(ds.scenario, "wet", "del_cvp_pmi_n");
    // const wet_del_swp_pmi_n = await tableQuery(ds.scenario, "wet", "del_swp_pmi_n");
    // ds.wet_del_mi_n = (wet_del_cvp_pmi_n + wet_del_swp_pmi_n) / mi_n_maximum;
    ds.wet_del_mi_n = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_mi_n")).map((step) => {
        return {val: (step.val / mi_n_maximum).toFixed(3), prob: step.prob};
    });

    // // south

    // const dry_del_cvp_pmi_s = await tableQuery(ds.scenario, "dry", "del_cvp_pmi_s");
    // const dry_del_swp_pmi_s = await tableQuery(ds.scenario, "dry", "del_swp_pmi_s");
    // ds.dry_del_mi_s = (dry_del_cvp_pmi_s + dry_del_swp_pmi_s) / mi_s_maximum;
    ds.dry_del_mi_s = (await tableExceedanceQuery(ds.scenario, "dry", "aggregated_mi_s")).map((step) => {
        return {val: (step.val / mi_s_maximum).toFixed(3), prob: step.prob};
    });

    // const wet_del_cvp_pmi_s = await tableQuery(ds.scenario, "wet", "del_cvp_pmi_s");
    // const wet_del_swp_pmi_s = await tableQuery(ds.scenario, "wet", "del_swp_pmi_s");
    // ds.wet_del_mi_s = (wet_del_cvp_pmi_s + wet_del_swp_pmi_s) / mi_s_maximum;
    ds.wet_del_mi_s = (await tableExceedanceQuery(ds.scenario, "wet", "aggregated_mi_s")).map((step) => {
        return {val: (step.val / mi_s_maximum).toFixed(3), prob: step.prob};
    });


    // DELTA SALINITY
    ds.wet_x2_prv = await tableExceedanceQuery(ds.scenario, "wet", "x2_prv");
    ds.dry_x2_prv = await tableExceedanceQuery(ds.scenario, "dry", "x2_prv");

    // check previous runs here

    // append new run
    prev_runs.push(JSON.parse(JSON.stringify(ds)));
    console.log(prev_runs);

    res.render("index.ejs", {
        ds: ds,
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });