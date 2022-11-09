"use strict";

const app = require("../server");

const PORT = 3000;

app.listen(PORT, () => {
    console.log("서버 가동");
});