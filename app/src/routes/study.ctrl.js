"use strict";

const Study = require("../models/Study");

const output = {
  initstudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.InitStudy();
    return res.status(response.err ? 409 : 201).json(response);
  },

  memberstudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.Member_Info();
    return res.status(response.err ? 409 : 201).json(response);
  },
};

const process = {
  createstudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.CreateStudy();
    return res.status(response.err ? 409 : 201).json(response);
  },

  editstudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.UpdateStudy();
    return res.status(response.err ? 409 : 201).json(response);
  },

  deletestudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.DeleteStudy();
    return res.status(response.err ? 409 : 201).json(response);
  },

  enterstudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.Enter_Study();
    return res.status(response.err ? 409 : 201).json(response);
  },
  exitstudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.Exit_Study();
    return res.status(response.err ? 409 : 201).json(response);
  },

  placestudy: async (req, res) => {
    const study = new Study(req.body);
    const response = await study.PlaceBooking();
    return res.status(response.err ? 409 : 201).json(response);
  },
};

module.exports = {
  output,
  process,
};
