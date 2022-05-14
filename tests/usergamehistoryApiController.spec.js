const { user_game_history, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
require("../controller/user_game_history_api");
const request = require("supertest");
const app = require("../app");

describe("User Game API Controller Testing", () => {
  beforeAll(async () => {
    await request(app)
      .post("/api/register")
      .send({ username: "adeliarhm", password: "1234" });
    const login = await request(app)
      .post("/api/login")
      .send({ username: "adeliarhm", password: "1234" });
    token = login.body.token;
  });

  afterAll(async () => {
    try {
      await sequelize.query(
        "TRUNCATE user_games, user_game_biodata, user_game_histories RESTART IDENTITY;",
        { type: QueryTypes.RAW }
      );
    } catch (error) {
      console.log(error);
    }
  });

  test("run /api/get-user-game-history To Get All User Game History without Auth and Fail Tidak berhasil", async () => {
    const { statusCode, error } = await request(app).get(
      "/api/get-user-game-history"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/get-user-game-history To Get All User Game Biodata with Auth Berhasil", async () => {
    const inputUserGames = await user_game_history.create({
      game_tittle: "admin",
      score: 0,
      level: 0,
    });

    const { body, statusCode, error } = await request(app)
      .get("/api/get-user-game-history")
      .set({ Authorization: token });
    console.log(error);
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Valid Get All User Game History");
    expect(body.data[body.data.length - 1].game_tittle).toEqual(
      inputUserGames.game_tittle
    );
    expect(body.data[body.data.length - 1].score).toEqual(inputUserGames.score);
    expect(body.data[body.data.length - 1].level).toEqual(inputUserGames.level);
    expect(body.data).toHaveLength(1);
  });

  test("run /api/create-user-game-history To Create User Game History Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/create-user-game-history")
      .set({ Authorization: token })
      .send({
        game_tittle: "Candy Crush",
        score: "2345281",
        level: "109",
      });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Valid Membuat User Game History");
    expect(body.result.game_tittle).toEqual("Candy Crush");
    expect(body.result.score).toEqual("2345281");
    expect(body.result.level).toEqual("109");
  });

  test("run /api/get-user-game-historybyid:id To Find One User Games History with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-user-game-historybyid/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game History dengan ID 100 Not Found");
  });

  test("run /api/update-user-game-biodata/:id To Update User Games Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app)
      .put("/api/update-user-game-biodata/1")
      .send({
        game_tittle: "Candy Crush",
        score: "232543",
        level: "120",
      });
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });
});
