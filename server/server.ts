import express from "express";
import pg from "pg";
import {
  caps,
  trinity_capacity,
  shasta_capacity,
  oroville_capacity,
  folsom_capacity,
  newmelones_capacity,
  millerton_capacity,
  ag_n_maximum,
  ag_s_maximum,
  mi_n_maximum,
  mi_s_maximum,
} from "./constants";
import {
  DataState,
  emptyDataState,
  neutralCompare,
  nullWarnings,
} from "./types";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
// const port = process.env.PORT || 8080;

// Debugging: Log incoming request origins
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

const allowedOrigins = [
  "https://coeqwal-web-game.vercel.app",
  "https://cal-water-vis.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: "Content-Type, Authorization",
  })
);

// // Ensure OPTIONS requests return proper CORS headers
// app.options("*", (req, res) => {
//   const origin = req.headers.origin;
//   if (origin && allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.sendStatus(204);
//   } else {
//     res.sendStatus(403);
//   }
// });

app.use(express.json());

const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  // port: process.env.PG_PORT,
  ssl: true,
});
db.connect()
  .then(() => console.log("successfully connected to the db"))
  .catch((err) => console.error("db connection failed: ", err.stack));

// // local db connection
// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "COEQWAL",
//   password: "gr3pw()rd!",
//   port: 5432,
// });
// db.connect();

const prev_runs: DataState[] = [];
var curr_run = 0;

var ds = emptyDataState;

var prev_compare = neutralCompare;

var comp_baseline;

var warnings = nullWarnings;

const tableExceedanceQuery = async (
  scenario: string,
  wyt: string,
  tableName: string
) => {
  // const result = await db.query(`SELECT SUM(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}' GROUP BY yr ORDER BY SUM(${scenario}) DESC`);
  const result = await db.query(
    `SELECT AVG(${scenario}) FROM ${tableName} WHERE wyt = '${wyt}' GROUP BY yr ORDER BY AVG(${scenario}) DESC`
  );
  const len = result.rows.length;
  const yrly_avgs = result.rows.map((row) => {
    return row.avg;
  });
  let index = 0;
  const exceedance = yrly_avgs.map((avg) => {
    index += 1;

    return 100 * (index / len + 1.0);
  });

  const mk10 = Math.floor(len / 10);
  const mk30 = Math.floor((len * 3) / 10);
  const mk50 = Math.floor(len / 2);
  const mk70 = Math.floor((len * 7) / 10);
  const mk90 = Math.floor((len * 9) / 10);

  const values = [
    { val: yrly_avgs[mk10].toFixed(2), prob: exceedance[mk10].toFixed(2) },
    { val: yrly_avgs[mk30].toFixed(2), prob: exceedance[mk30].toFixed(2) },
    { val: yrly_avgs[mk50].toFixed(2), prob: exceedance[mk50].toFixed(2) },
    { val: yrly_avgs[mk70].toFixed(2), prob: exceedance[mk70].toFixed(2) },
    { val: yrly_avgs[mk90].toFixed(2), prob: exceedance[mk90].toFixed(2) },
  ];

  return values;
};

const getNewDS = async (scenario: string) => {
  let new_ds = emptyDataState;

  new_ds.scenario = scenario;

  new_ds.dry_s_trinity = (
    await tableExceedanceQuery(scenario, "dry", "s_trinity")
  ).map((step) => {
    return {
      val: parseFloat((step.val / trinity_capacity).toFixed(4)),
      prob: step.prob,
    };
  });
  new_ds.wet_s_trinity = (
    await tableExceedanceQuery(scenario, "wet", "s_trinity")
  ).map((step) => {
    return {
      val: parseFloat((step.val / trinity_capacity).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.dry_s_shasta = (
    await tableExceedanceQuery(scenario, "dry", "s_shasta")
  ).map((step) => {
    return {
      val: parseFloat((step.val / shasta_capacity).toFixed(4)),
      prob: step.prob,
    };
  });
  new_ds.wet_s_shasta = (
    await tableExceedanceQuery(scenario, "wet", "s_shasta")
  ).map((step) => {
    return {
      val: parseFloat((step.val / shasta_capacity).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.dry_s_oroville = (
    await tableExceedanceQuery(scenario, "dry", "s_oroville")
  ).map((step) => {
    return {
      val: parseFloat((step.val / oroville_capacity).toFixed(4)),
      prob: step.prob,
    };
  });
  new_ds.wet_s_oroville = (
    await tableExceedanceQuery(scenario, "wet", "s_oroville")
  ).map((step) => {
    return {
      val: parseFloat((step.val / oroville_capacity).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.dry_s_folsom = (
    await tableExceedanceQuery(scenario, "dry", "s_folsom")
  ).map((step) => {
    return {
      val: parseFloat((step.val / folsom_capacity).toFixed(4)),
      prob: step.prob,
    };
  });
  new_ds.wet_s_folsom = (
    await tableExceedanceQuery(scenario, "wet", "s_folsom")
  ).map((step) => {
    return {
      val: parseFloat((step.val / folsom_capacity).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.dry_s_newmelones = (
    await tableExceedanceQuery(scenario, "dry", "s_newmelones")
  ).map((step) => {
    return {
      val: parseFloat((step.val / newmelones_capacity).toFixed(4)),
      prob: step.prob,
    };
  });
  new_ds.wet_s_newmelones = (
    await tableExceedanceQuery(scenario, "wet", "s_newmelones")
  ).map((step) => {
    return {
      val: parseFloat((step.val / newmelones_capacity).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.dry_s_millerton = (
    await tableExceedanceQuery(scenario, "dry", "s_millerton")
  ).map((step) => {
    return {
      val: parseFloat((step.val / millerton_capacity).toFixed(4)),
      prob: step.prob,
    };
  });
  new_ds.wet_s_millerton = (
    await tableExceedanceQuery(scenario, "wet", "s_millerton")
  ).map((step) => {
    return {
      val: parseFloat((step.val / millerton_capacity).toFixed(4)),
      prob: step.prob,
    };
  });

  // EQUITY
  const dry_equity_results = await db.query(
    "SELECT equity FROM summary_metrics_dry_6_5_24 WHERE scenario = $1;",
    [scenario]
  );
  new_ds.dry_equity = dry_equity_results.rows[0].equity.toFixed(4);

  const wet_equity_results = await db.query(
    "SELECT equity FROM summary_metrics_wet_6_5_24 WHERE scenario = $1;",
    [scenario]
  );
  new_ds.wet_equity = wet_equity_results.rows[0].equity.toFixed(4);

  // AG DELIVERIES
  // north
  new_ds.dry_del_ag_n = (
    await tableExceedanceQuery(scenario, "dry", "aggregated_ag_n")
  ).map((step) => {
    return {
      val: parseFloat((step.val / ag_n_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.wet_del_ag_n = (
    await tableExceedanceQuery(scenario, "wet", "aggregated_ag_n")
  ).map((step) => {
    return {
      val: parseFloat((step.val / ag_n_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  // // south
  new_ds.dry_del_ag_s = (
    await tableExceedanceQuery(scenario, "dry", "aggregated_ag_s")
  ).map((step) => {
    return {
      val: parseFloat((step.val / ag_s_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.wet_del_ag_s = (
    await tableExceedanceQuery(scenario, "wet", "aggregated_ag_s")
  ).map((step) => {
    return {
      val: parseFloat((step.val / ag_s_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  // M&I DELIVERIES
  // north
  new_ds.dry_del_mi_n = (
    await tableExceedanceQuery(scenario, "dry", "aggregated_mi_n")
  ).map((step) => {
    return {
      val: parseFloat((step.val / mi_n_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.wet_del_mi_n = (
    await tableExceedanceQuery(scenario, "wet", "aggregated_mi_n")
  ).map((step) => {
    return {
      val: parseFloat((step.val / mi_n_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  // // south
  new_ds.dry_del_mi_s = (
    await tableExceedanceQuery(scenario, "dry", "aggregated_mi_s")
  ).map((step) => {
    return {
      val: parseFloat((step.val / mi_s_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  new_ds.wet_del_mi_s = (
    await tableExceedanceQuery(scenario, "wet", "aggregated_mi_s")
  ).map((step) => {
    return {
      val: parseFloat((step.val / mi_s_maximum).toFixed(4)),
      prob: step.prob,
    };
  });

  // DELTA SALINITY
  new_ds.wet_x2_prv = await tableExceedanceQuery(scenario, "wet", "x2_prv");
  new_ds.dry_x2_prv = await tableExceedanceQuery(scenario, "dry", "x2_prv");

  return new_ds;
};

const compareExceedance = (
  curr: { val: number; prob: string }[],
  prev: { val: number; prob: string }[]
) => {
  const currSum =
    curr[0].val + curr[1].val + curr[2].val + curr[3].val + curr[4].val;
  const prevSum =
    prev[0].val + prev[1].val + prev[2].val + prev[3].val + prev[4].val;
  if (currSum === prevSum) {
    return 0;
  } else {
    if (currSum > prevSum) {
      return 1;
    } else {
      return -1;
    }
  }
};

const compareRun = (runToCompare: DataState) => {
  const last_run = runToCompare;

  let compare = neutralCompare;

  compare.scenario = last_run.scenario;
  compare.lev_demands = last_run.lev_demands;
  compare.lev_carryover = last_run.lev_carryover;
  compare.lev_priority = last_run.lev_priority;
  compare.lev_delta = last_run.lev_delta;
  compare.lev_minflow = last_run.lev_minflow;

  compare.dry_equity =
    ds.dry_equity === last_run.dry_equity
      ? 0
      : ds.dry_equity > last_run.dry_equity
      ? 1
      : -1;
  compare.wet_equity =
    ds.wet_equity === last_run.wet_equity
      ? 0
      : ds.wet_equity > last_run.wet_equity
      ? 1
      : -1;
  compare.dry_equity_value = last_run.dry_equity;
  compare.wet_equity_value = last_run.wet_equity;

  compare.dry_s_trinity = compareExceedance(
    ds.dry_s_trinity,
    last_run.dry_s_trinity
  );
  compare.wet_s_trinity = compareExceedance(
    ds.wet_s_trinity,
    last_run.wet_s_trinity
  );

  compare.dry_s_shasta = compareExceedance(
    ds.dry_s_shasta,
    last_run.dry_s_shasta
  );
  compare.wet_s_shasta = compareExceedance(
    ds.wet_s_shasta,
    last_run.wet_s_shasta
  );

  compare.dry_s_oroville = compareExceedance(
    ds.dry_s_oroville,
    last_run.dry_s_oroville
  );
  compare.wet_s_oroville = compareExceedance(
    ds.wet_s_oroville,
    last_run.wet_s_oroville
  );

  compare.dry_s_folsom = compareExceedance(
    ds.dry_s_folsom,
    last_run.dry_s_folsom
  );
  compare.wet_s_folsom = compareExceedance(
    ds.wet_s_folsom,
    last_run.wet_s_folsom
  );

  compare.dry_s_newmelones = compareExceedance(
    ds.dry_s_newmelones,
    last_run.dry_s_newmelones
  );
  compare.wet_s_newmelones = compareExceedance(
    ds.wet_s_newmelones,
    last_run.wet_s_newmelones
  );

  compare.dry_s_millerton = compareExceedance(
    ds.dry_s_millerton,
    last_run.dry_s_millerton
  );
  compare.wet_s_millerton = compareExceedance(
    ds.wet_s_millerton,
    last_run.wet_s_millerton
  );

  compare.dry_del_ag_n = compareExceedance(
    ds.dry_del_ag_n,
    last_run.dry_del_ag_n
  );
  compare.wet_del_ag_n = compareExceedance(
    ds.wet_del_ag_n,
    last_run.wet_del_ag_n
  );
  compare.dry_del_ag_s = compareExceedance(
    ds.dry_del_ag_s,
    last_run.dry_del_ag_s
  );
  compare.wet_del_ag_s = compareExceedance(
    ds.wet_del_ag_s,
    last_run.wet_del_ag_s
  );

  compare.dry_del_mi_n = compareExceedance(
    ds.dry_del_mi_n,
    last_run.dry_del_mi_n
  );
  compare.wet_del_mi_n = compareExceedance(
    ds.wet_del_mi_n,
    last_run.wet_del_mi_n
  );
  compare.dry_del_mi_s = compareExceedance(
    ds.dry_del_mi_s,
    last_run.dry_del_mi_s
  );
  compare.wet_del_mi_s = compareExceedance(
    ds.wet_del_mi_s,
    last_run.wet_del_mi_s
  );

  compare.dry_x2_prv = compareExceedance(last_run.dry_x2_prv, ds.dry_x2_prv);
  compare.wet_x2_prv = compareExceedance(last_run.wet_x2_prv, ds.wet_x2_prv);
  return compare;
};

const checkWarnings = () => {
  warnings.deliveriesNODDry = checkAgMiWarningMiddle(
    ds.dry_del_ag_n,
    ds.dry_del_mi_n,
    0.5
  );
  warnings.deliveriesNODWet = checkAgMiWarningMiddle(
    ds.wet_del_ag_n,
    ds.wet_del_mi_n,
    0.5
  );
  warnings.deliveriesSODDry = checkAgMiWarningMiddle(
    ds.dry_del_ag_s,
    ds.dry_del_mi_s,
    0.5
  );
  warnings.deliveriesSODWet = checkAgMiWarningMiddle(
    ds.wet_del_ag_s,
    ds.wet_del_mi_s,
    0.5
  );
  warnings.deltaAlertDry = checkDeltaWarningMiddle(ds.dry_x2_prv, 70);
  warnings.deltaAlertWet = checkDeltaWarningMiddle(ds.wet_x2_prv, 70);
  warnings.deltaCriticalDry = checkDeltaWarningMiddle(ds.dry_x2_prv, 80);
  warnings.deltaCriticalWet = checkDeltaWarningMiddle(ds.wet_x2_prv, 80);
  warnings.equityDry = ds.dry_equity < 0.6;
  warnings.equityWet = ds.wet_equity < 0.6;
  warnings.reservoirsDry = checkReservoirsWarning(
    ds.dry_s_trinity,
    ds.dry_s_shasta,
    ds.dry_s_folsom,
    ds.dry_s_oroville,
    ds.dry_s_newmelones,
    ds.dry_s_millerton,
    0.5
  );
  warnings.reservoirsWet = checkReservoirsWarning(
    ds.wet_s_trinity,
    ds.wet_s_shasta,
    ds.wet_s_folsom,
    ds.wet_s_oroville,
    ds.wet_s_newmelones,
    ds.wet_s_millerton,
    0.5
  );
};

const checkReservoirsWarning = (
  res1: { val: number; prob: string }[],
  res2: { val: number; prob: string }[],
  res3: { val: number; prob: string }[],
  res4: { val: number; prob: string }[],
  res5: { val: number; prob: string }[],
  res6: { val: number; prob: string }[],
  target: number
) => {
  const avg =
    (res1[2].val +
      res2[2].val +
      res3[2].val +
      res4[2].val +
      res5[2].val +
      res6[2].val) /
    6;
  return !(avg >= target);
};

const checkAgMiWarningMiddle = (
  value1: { val: number; prob: string }[],
  value2: { val: number; prob: string }[],
  target: number
) => {
  const avg = (value1[2].val + value2[2].val) / 2;
  return !(avg >= target);
};

const checkDeltaWarningMiddle = (
  value: { val: number; prob: string }[],
  target: number
) => {
  return value[2].val >= target;
};

app.post("/compare", async (req, res) => {
  try {
    const compType = req.body["compare"];
    let compare;

    if (compType == "baseline") {
      const baseline = await getNewDS("expl0000");
      comp_baseline = compareRun(baseline);
      compare = comp_baseline;
    } else {
      compare = prev_compare;
    }

    res.json({
      compare: compare,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/submit", async (req, res) => {
  try {
    const levers = req.body;
    ds.lev_demands = levers["demands"];
    ds.lev_carryover = levers["carryover"];
    ds.lev_priority = levers["priority"];
    ds.lev_delta = levers["delta"];
    ds.lev_minflow = levers["minflow"];

    const result = await db.query(
      'SELECT "Scenario" FROM "CalLite_Levers" WHERE d = $1 AND c = $2 AND p = $3 AND r = $4 AND m = $5;',
      [
        ds.lev_demands,
        ds.lev_carryover,
        ds.lev_priority,
        ds.lev_delta,
        ds.lev_minflow,
      ]
    );

    ds = await getNewDS(result.rows[0].Scenario);

    checkWarnings();
    // check previous runs here
    if (curr_run !== 0) {
      prev_compare = compareRun(prev_runs[prev_runs.length - 1]);
    }

    // append new run
    prev_runs.push(JSON.parse(JSON.stringify(ds)));
    curr_run += 1;

    res.json({
      ds: ds,
      prev_compare: prev_compare,
      warnings: warnings,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// app.listen(port, () => {
//   console.log("server started on port " + port);
// });

export default app;
