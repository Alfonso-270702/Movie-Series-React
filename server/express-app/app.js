const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");

require("./config/config.js");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(port, () => console.log(`Listen on port ${port}`));
