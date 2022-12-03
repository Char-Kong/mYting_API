"use strict";

const { query } = require("../config/db");
const db = require("../config/db");

class StudyStorage {
  // 스터디생성
  static async CreateStudy(data) {
    const query =
      "INSERT INTO Study(CreatorUID, Studyname, MBTI, Introduction, Rule, Maximum) VALUES(?, ?, ?, ?, ?, ?);";
    const MBTI = await this.Search_User_MBTI(data);
    const param = [
      data.uid,
      data.studyname,
      MBTI,
      data.introduction,
      data.rule,
      data.maximum,
    ];

    db.query(query, param, async (err, results) => {
      if (err) reject(err);
      else {
        const body = { studyid: results.member_no, uid: data.uid };
        await this.AddCreator(body);
        resolve({ success: true, msg: "스터디가 개설되었습니다." });
      }
    });
  }

  //메뉴 최초 접속시 출력
  static async InitStudy(data) {
    const query = "SELECT * FROM Study;";

    db.query(query, (err, results) => {
      if (err) reject(err);
      resolve(this.SortStudy(data, results));
    });
  }

  // 스터디검색(스터디 이름)
  static async SearchStudyByStudyName(data) {
    const query = "SELECT * FROM Study WHERE Studyname = ?;";
    const param = [data.studyname];

    db.query(query, param, async (err, results) => {
      if (err) reject(err);
      resolve(await this.SortStudy(data, results));
    });
  }

  // 스터디검색(개설자 이름)
  static async SearchStudyByCreatorName(data) {
    //1. 해당 이름을 가진 유저의 uid 조회
    const uid = this.Lookup_User_Byname(data);

    //2. 해당 uid를 가진 스터디 검색
    const query = "SELECT * FROM Study WHERE CreatorID = ?;";
    const param = [uid];

    db.query(query, param, async (err, results) => {
      if (err) reject(err);
      resolve(await this.SortStudy(data, results));
    });
  }

  static Lookup_User_Byname(data) {
    const query = "SELECT uid FROM User WHERE name = ?;";
    const param = [data.name];

    db.query(query, param, async (err, results) => {
      if (err) reject(err);
      resolve(await this.SortStudy(results));
    });
  }

  // 스터디검색 (주제)
  static async SearchStudyBySubject(data) {
    const query = "SELECT * FROM Study WHERE Subject = ?;";
    const param = [data.subject];

    db.query(query, param, async (err, results) => {
      if (err) reject(err);
      resolve(await this.SortStudy(data, results));
    });
  }

  // 스터디삭제
  static async DeleteStudy(data) {
    const query = "DELETE FROM Study WHERE StudyID = ?;";
    const param = [data.studyid];

    db.query(query, param, (err) => {
      if (err) reject(err);
      resolve({ success: true, msg: "스터디가 삭제되었습니다." });
    });
  }

  // 스터디수정
  static async UpdateStudy(data) {
    const query = "UPDATE Study SET Studyname = ?, rule = ? WHERE StudyID = ?;";
    const param = [data.studyname, data.starttime, data.endtime, data.studyid];

    db.query(query, param, (err) => {
      if (err) reject(err);
      resolve({ success: true, msg: "스터디 정보가 수정되었습니다." });
    });
  }

  static async SortStudy(data, result) {
    // 1. 유저 MBTI조회
    const MBTI_user = await this.LookupMBTI(data);

    // 2. MBTI 상성표 조회
    const Ideal_MBTI_list = await this.Lookup_Ideal_MBTI(MBTI_user);

    // 3. MBTI순으로 정렬
    const result = Ideal_MBTI_list.reduce(async (acc, cur, idx) => {
      acc.push(await this.Lookup_Study_MBTI(cur));
    }, []);

    return result;
  }

  static Lookup_User_MBTI(data) {
    const query = "SELECT MBTI FROM User WHERE uid = ?;";
    const param = [data.uid];

    db.query(query, param, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  }

  static Lookup_Ideal_MBTI(MBTI) {
    const query =
      "SELECT Ideal1, Ideal2, Ideal3, Ideal4, Ideal5, Ideal6, Ideal7, Ideal8, Ideal9, Ideal10, Ideal11, Ideal12, Ideal13, Ideal14, Ideal15, Ideal16 FROM IdealMBTI WHERE MBTI = ?;";
    const param = [MBTI];

    db.query(query, param, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  }

  static Lookup_Study_MBTI(MBTI) {
    const query = "SELECT * FROM Study WHERE MBTI = ? ORDER BY StudyID;";
    const param = [MBTI];

    db.query(query, param, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  }

  static async LookupMember(data) {
    // 1. 스터디 멤버 uid 조회
    const uid_list = await this.Lookup_uid(data);

    // 2. 유저 정보 조회
    const result = await uid_list.reduce((acc, cur, idx) => {
      acc.push(this.Lookup_Member_Info(cur));
    }, []);

    return acc;
  }

  static Lookup_uid(data) {
    const query =
      "SELECT * FROM StudyMember WHERE StudyID = ? ORDER BY Creator, ParticipantUID;";
    const param = [data.studyid];

    db.query(query, param, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  }

  static Lookup_Member_Info(uid) {
    const query =
      "SELECT name, StudentID, Major, Creator FROM User WHERE uid = ?;";
    const param = [uid];

    db.query(query, param, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  }

  //멤버 추가
  static async AddMember(data) {
    const query =
      "INSERT INTO StudyMember(StudyID, ParticipantUID) VALUES(?, ?);";
    const param = [data.studyid, data.uid];

    db.query(query, param, (err) => {
      if (err) reject(err);
      resolve({ success: true, msg: "스터디에 가입되었습니다" });
    });
  }

  //멤버 삭제
  static async DeleteMember(data) {
    const query = "DELETE FROM StudyMember WHERE ParticipantUID = ?;";
    const param = [data.uid];

    db.query(query, param, (err) => {
      if (err) reject(err);
      resolve({ success: true, msg: "스터디에서 탈퇴되었습니다." });
    });
  }

  //개설자로 추가
  static AddCreator(data) {
    const query =
      "INSERT INTO StudyMember(StudyID, ParticipantUID, Creator) VALUES(?, ?, ?)";
    const param = [data.studyid, data.uid, 1];

    db.query(query, param, (err) => {
      if (err) reject(err);
      resolve({ success: true });
    });
  }

  //대관 장소 추가
  static async AddPlace(data) {
    const query = "UPDATE Study SET Place = ? WHERE StudyID = ?;";
    const param = [data.place, data.studyid];

    db.query(query, param, (err) => {
      if (err) reject(err);
      resolve({ success: true });
    });
  }
}

module.exports = StudyStorage;
