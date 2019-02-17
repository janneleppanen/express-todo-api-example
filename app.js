const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(5000, () => console.log("App running at port 5000"));
