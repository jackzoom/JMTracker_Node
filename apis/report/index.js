"use strict";
var express = require("express");
var controller = require("./report.controller");
var router = express.Router();
router.get("/", controller.get);
router.post("/", controller.push);
router.get("/mock", controller.insert);

module.exports = router;
