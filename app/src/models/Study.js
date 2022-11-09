"use strict";

const StudyStorage = require("./StudyStorage");

class Study {
  constructor(body) {
    this.body = body;
  }

  async CreateStudy() {
    const body = this.body;

    try {
      const response = await StudyStorage.CreateStudy(body);
      body.creator = 1;

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async DeleteStudy() {
    const body = this.body;

    try {
      const response = await StudyStorage.CreateStudy(body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async UpdateStudy() {
    const body = this.body;

    try {
      const response = await StudyStorage.UpdateStudy(body);
      return response;
    } catch (err) {
      console.err(err);
    }
  }

  async SearchStudy() {
    const body = this.body;

    try {
      const response = await StudyStorage.SearchStudy(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async InitStudy() {
    const body = this.body;

    try {
      const response = await StudyStorage.InitStudy(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Study;
