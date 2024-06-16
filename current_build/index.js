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

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/submit", async (req, res) => {
    const levers = req.body;
    const result = await db.query('SELECT "Scenario" FROM "CalLite_Levers" WHERE d = $1 AND c = $2 AND p = $3 AND r = $4 AND m = $5;',
        [
            levers["demands"],
            levers["carryover"],
            levers["priority"],
            levers["delta"],
            levers["minflow"]
        ]
    )
    const scenario = result.rows[0].Scenario;

    const s_trinity = await db.query('SELECT trinity FROM storage_averages WHERE scenario = $1;', [scenario]);
    const s_shasta = await db.query('SELECT shasta FROM storage_averages WHERE scenario = $1;', [scenario]);
    const s_folsom = await db.query('SELECT folsom FROM storage_averages WHERE scenario = $1;', [scenario]);
    const s_oroville = await db.query('SELECT oroville FROM storage_averages WHERE scenario = $1;', [scenario]);
    const s_newmelones = await db.query('SELECT newmelones FROM storage_averages WHERE scenario = $1;', [scenario]);
    const s_millerton = await db.query('SELECT millerton FROM storage_averages WHERE scenario = $1;', [scenario]);


    // console.log(s_trinity.rows[0].trinity);
    res.render("index.ejs", {
        scenario: scenario, 
        s_trinity: s_trinity.rows[0].trinity,
        s_shasta: s_shasta.rows[0].shasta,
        s_folsom: s_folsom.rows[0].folsom,
        s_oroville: s_oroville.rows[0].oroville,
        s_newmelones: s_newmelones.rows[0].newmelones,
        s_millerton: s_millerton.rows[0].millerton,
    });
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
  });