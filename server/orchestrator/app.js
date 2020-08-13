const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const route = require("./route");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

app.listen(port, () => console.log(`Listen on port ${port}`));
