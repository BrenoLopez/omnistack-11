const express = require("express");
const { errors } = require("celebrate");
const routes = require("./routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.listen(3001, () => console.log("Server running in port 3001"));
