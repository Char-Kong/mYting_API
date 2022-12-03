"use strict";

const express = require("express");
const router = express.Router();
const studyctrl = require("./study.ctrl");

router.get("/api/initstudy", studyctrl.output.initstudy);
router.get("/api/memberstudy", studyctrl.output.memberstudy);

router.post("/api/createstudy", studyctrl.process.createstudy);
router.post("/api/editstudy", studyctrl.process.editstudy);
router.post("/api/deletestudy", studyctrl.process.deletestudy);
router.post("/api/enterstudy", studyctrl.process.enterstudy);
router.post("/api/exitstudy", studyctrl.process.exitstudy);
router.post("/api/placestudy", studyctrl.process.placestudy);

module.exports = router;
