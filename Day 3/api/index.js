var express = require("express");
var app = express();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/test", (req, res, next) => {
    console.log(req);
    console.log(res);
    console.log(next);
    res.json(["Tony Stark","Thor Odinson","Bruce Banner","Steve Rogers","Loki Ferguson"]);
});