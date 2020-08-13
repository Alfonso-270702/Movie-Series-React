const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const route = require("./route");

require("./config/config.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(port, () => console.log(`Running on port ${port}`));
