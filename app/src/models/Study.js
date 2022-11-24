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

  async SearchStudy_ByStudyName() {
    const body = this.body;

    try {
      const response = await StudyStorage.SearchStudyByStudyName(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async SearchStudy_ByCreatorName() {
    const body = this.body;

    try {
      const response = await StudyStorage.SearchStudyByCreatorName(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async SearchStudyBySubject() {
    const body = this.body;

    try {
      const response = await StudyStorage.SearchStudyBySubject(body);
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

  async Enter_Study() {
    const body = this.body;

    try {
      const response = await StudyStorage.AddMember(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async Exit_Study() {
    const body = this.body;

    try {
      const response = await StudyStorage.DeleteMember(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async Member_Info() {
    const body = this.body;

    try {
      const response = await StudyStorage.LookupMember(body);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async PlaceBooking() {
    const body = this.body;

    try {
      const response = await StudyStorage.AddPlace(body);

      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Study;
