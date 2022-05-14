const { user_game_biodata, sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
require("../controller/user_game_biodata_api");
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

  test("run /api/get-user-game-biodata To Get All User Games without Auth and Fail Tidak berhasil", async () => {
    const { statusCode, error } = await request(app).get(
      "/api/get-user-game-biodata"
    );
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });

  test("run /api/get-users-game-biodata To Get All User Game Biodata with Auth Berhasil", async () => {
    const inputUserGames = await user_game_biodata.create({
      name_user: "admin",
      email: "admin@gmail.com",
      gender: "admin,",
    });

    const { body, statusCode, error } = await request(app)
      .get("/api/get-user-game-biodata")
      .set({ Authorization: token });
    console.log(error);
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Valid Get All User Game Biodata");
    expect(body.data[body.data.length - 1].name_user).toEqual(
      inputUserGames.name_user
    );
    expect(body.data[body.data.length - 1].email).toEqual(inputUserGames.email);
    expect(body.data[body.data.length - 1].gender).toEqual(
      inputUserGames.gender
    );
    expect(body.data).toHaveLength(1);
  });

  test("run /api/create-user-games-biodata To Create User Game Biodata Data with Auth", async () => {
    const { body, statusCode } = await request(app)
      .post("/api/create-user-games-biodata")
      .set({ Authorization: token })
      .send({
        name_user: "adeliarhm",
        email: "adeliarhmwt@gmail.com",
        gender: "perempuan",
      });
    expect(statusCode).toEqual(200);
    expect(body.message).toEqual("Valid Membuat User Game Biodata");
    expect(body.result.name_user).toEqual("adeliarhm");
    expect(body.result.email).toEqual("adeliarhmwt@gmail.com");
    expect(body.result.gender).toEqual("perempuan");
  });

  test("run /api/get-user-game-biodatabyid:id To Find One User Games Biodata with unknown ID and Fail", async () => {
    const { body, statusCode } = await request(app)
      .get("/api/get-user-game-biodatabyid/100")
      .set({ Authorization: token });
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual("User Game Biodata dengan ID 100 Not Found");
  });

  test("run /api/update-user-game-biodata/:id To Update User Games Data without Auth and Fail", async () => {
    const { statusCode, error } = await request(app)
      .put("/api/update-user-game-biodata/1")
      .send({
        name_user: "adeliarhmm",
        email: "adeliarhmw@gmail.com",
        password: "1234565",
      });
    expect(statusCode).toEqual(403);
    expect(error.text).toEqual("A token is required for authentication");
  });
});
