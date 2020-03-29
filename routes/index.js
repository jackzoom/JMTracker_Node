var express = require("express");
var router = express.Router();

router.use("/report", require("../apis/report"));
module.exports = router;
