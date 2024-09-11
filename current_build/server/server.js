import express from "express"

const app = express();
const port = 8080;

app.get("/api", (req, res) => {
    res.json({"data": [1, 2, 3]})
})

app.listen(port, () => {console.log("server started on port " + port)})