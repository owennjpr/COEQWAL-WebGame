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
    wet_equity: 0,

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


app.get("/", (req, res) => {
    res.render("index.ejs");
})

const tableQuery = async (scenario, wyt, tableName) => {
    const result = await db.query(`SELECT AVG(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}'`);
    return result.rows[0].avg;
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

    ds.dry_s_trinity = (await tableQuery(ds.scenario, "dry", "s_trinity")) / trinity_capacity;
    ds.wet_s_trinity = (await tableQuery(ds.scenario, "wet", "s_trinity")) / trinity_capacity;

    ds.dry_s_shasta = (await tableQuery(ds.scenario, "dry", "s_shasta")) / shasta_capacity;
    ds.wet_s_shasta = (await tableQuery(ds.scenario, "wet", "s_shasta")) / shasta_capacity;

    ds.dry_s_oroville = (await tableQuery(ds.scenario, "dry", "s_oroville")) / oroville_capacity;
    ds.wet_s_oroville = (await tableQuery(ds.scenario, "wet", "s_oroville")) / oroville_capacity;

    ds.dry_s_folsom = (await tableQuery(ds.scenario, "dry", "s_folsom")) / folsom_capacity;
    ds.wet_s_folsom = (await tableQuery(ds.scenario, "wet", "s_folsom")) / folsom_capacity;

    ds.dry_s_newmelones = (await tableQuery(ds.scenario, "dry", "s_newmelones")) / newmelones_capacity;
    ds.wet_s_newmelones = (await tableQuery(ds.scenario, "wet", "s_newmelones")) / newmelones_capacity;
    
    ds.dry_s_millerton = (await tableQuery(ds.scenario, "dry", "s_millerton")) / millerton_capacity;
    ds.wet_s_millerton = (await tableQuery(ds.scenario, "wet", "s_millerton")) / millerton_capacity;
    
    // EQUITY
    const dry_equity_results = await db.query("SELECT equity FROM summary_metrics_dry_6_5_24 WHERE scenario = $1;", [ds.scenario]);
    ds.dry_equity = dry_equity_results.rows[0].equity;

    const wet_equity_results = await db.query("SELECT equity FROM summary_metrics_wet_6_5_24 WHERE scenario = $1;", [ds.scenario]);
    ds.wet_equity = wet_equity_results.rows[0].equity;

    // AG DELIVERIES
    // north
    const dry_del_cvp_pag_n = await tableQuery(ds.scenario, "dry", "del_cvp_pag_n");
    const dry_del_swp_pag_n = await tableQuery(ds.scenario, "dry", "del_swp_pag_n");
    ds.dry_del_ag_n = dry_del_cvp_pag_n + dry_del_swp_pag_n;

    const wet_del_cvp_pag_n = await tableQuery(ds.scenario, "wet", "del_cvp_pag_n");
    const wet_del_swp_pag_n = await tableQuery(ds.scenario, "wet", "del_swp_pag_n");
    ds.wet_del_ag_n = wet_del_cvp_pag_n + wet_del_swp_pag_n;

    // south
    const dry_del_cvp_pag_s = await tableQuery(ds.scenario, "dry", "del_cvp_pag_s");
    const dry_del_swp_pag_s = await tableQuery(ds.scenario, "dry", "del_swp_pag_s");
    ds.dry_del_ag_s = dry_del_cvp_pag_s + dry_del_swp_pag_s;

    const wet_del_cvp_pag_s = await tableQuery(ds.scenario, "wet", "del_cvp_pag_s");
    const wet_del_swp_pag_s = await tableQuery(ds.scenario, "wet", "del_swp_pag_s");
    ds.wet_del_ag_s = wet_del_cvp_pag_s + wet_del_swp_pag_s;

    // M&I DELIVERIES
    // north

    const dry_del_cvp_pmi_n = await tableQuery(ds.scenario, "dry", "del_cvp_pmi_n");
    const dry_del_swp_pmi_n = await tableQuery(ds.scenario, "dry", "del_swp_pmi_n");
    ds.dry_del_mi_n = dry_del_cvp_pmi_n + dry_del_swp_pmi_n;

    const wet_del_cvp_pmi_n = await tableQuery(ds.scenario, "wet", "del_cvp_pmi_n");
    const wet_del_swp_pmi_n = await tableQuery(ds.scenario, "wet", "del_swp_pmi_n");
    ds.wet_del_mi_n = wet_del_cvp_pmi_n + wet_del_swp_pmi_n;

    // south

    const dry_del_cvp_pmi_s = await tableQuery(ds.scenario, "dry", "del_cvp_pmi_s");
    const dry_del_swp_pmi_s = await tableQuery(ds.scenario, "dry", "del_swp_pmi_s");
    ds.dry_del_mi_s = dry_del_cvp_pmi_s + dry_del_swp_pmi_s;

    const wet_del_cvp_pmi_s = await tableQuery(ds.scenario, "wet", "del_cvp_pmi_s");
    const wet_del_swp_pmi_s = await tableQuery(ds.scenario, "wet", "del_swp_pmi_s");
    ds.wet_del_mi_s = wet_del_cvp_pmi_s + wet_del_swp_pmi_s;


    // DELTA SALINITY
    ds.wet_x2_prv = await tableQuery(ds.scenario, "wet", "x2_prv");
    ds.dry_x2_prv = await tableQuery(ds.scenario, "dry", "x2_prv");

    // check previous runs here

    // append new run
    prev_runs.push(JSON.parse(JSON.stringify(ds)));
    console.log(prev_runs);

    res.render("index.ejs", {
        ds: ds,
        
        // scenario: scenario, 
        
        //reservoirs
        // dry_s_trinity: ds.dry_s_trinity,
        // dry_s_shasta: ds.dry_s_shasta,
        // dry_s_folsom: ds.dry_s_folsom,
        // dry_s_oroville: ds.dry_s_oroville,
        // dry_s_newmelones: ds.dry_s_newmelones,
        // dry_s_millerton: ds.dry_s_millerton,

        // wet_s_trinity: ds.wet_s_trinity,
        // wet_s_shasta: ds.wet_s_shasta,
        // wet_s_folsom: ds.wet_s_folsom,
        // wet_s_oroville: ds.wet_s_oroville,
        // wet_s_newmelones: ds.wet_s_newmelones,
        // wet_s_millerton: ds.wet_s_millerton,

        // //dry
        // dry_del_ag_n: ds.dry_del_ag_n,
        // dry_del_ag_s: ds.dry_del_ag_s,
        // dry_del_mi_n: ds.dry_del_mi_n,
        // dry_del_mi_s: ds.dry_del_mi_s,
        // dry_x2_prv: ds.dry_x2_prv,
        // dry_equity: ds.dry_equity,
        // //wet
        // wet_del_ag_n: ds.wet_del_ag_n,
        // wet_del_ag_s: ds.wet_del_ag_s,
        // wet_del_mi_n: ds.wet_del_mi_n,
        // wet_del_mi_s: ds.wet_del_mi_s,
        // wet_x2_prv: ds.wet_x2_prv,
        // wet_equity: ds.wet_equity,
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });