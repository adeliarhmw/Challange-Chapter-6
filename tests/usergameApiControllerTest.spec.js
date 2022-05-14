const { user_game, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
require("../controller/user_game_api");
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

  test("run /api/get-user-game To Get All User Games without Auth and Fail Tidak berhasil", async () => {
    const { statusCode, error } = await request(app).get("/api/get-user-game");
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/get-users-game To Get All User Games with Auth Berhasil", async () => {
    const inputUserGames = await user_game.create({
      username: "admin",
      password: "admin",
    });

    const { body, statusCode, error } = await request(app)
      .get("/api/get-user-game")
      .set({ Authorization: token });
    console.log(error);
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Valid Get All User Game");
    expect(body.data[body.data.length - 1].username).toEqual(
      inputUserGames.username
    );
    expect(body.data[body.data.length - 1].password).toEqual(
      inputUserGames.password
    );
    expect(body.data).toHaveLength(2);
  });

  test("run /api/get-user-gamebyid/:id To Find One User Games By ID with Auth", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-user-gamebyid/1")
      .set({ Authorization: token });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Valid Get User Game By Id");
    expect(body.result.username).toEqual("adeliarhm");
    expect(body.result.password).toEqual(body.result.password);
    // sip aman jalan
  });

  test("run /api/get-user-gamebyid/:id To Find One User Games with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-user-gamebyid/500")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game dengan ID 500 Tidak di temukan");
  });

  test("run /api/delete-user-game/:id To Delete User Games with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .delete("/api/delete-user-game/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game dengan ID 100 Not Found");
    expect(body.result).toEqual(0);
  });
});
