const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./users");
const { db } = require("./index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
describe("Tour Model", () => {
  const User = userModel(db, DataTypes);

  beforeAll(async () => {
    await db.sync({ force: true });
  });

  afterEach(async () => {
    await User.destroy({ truncate: true });
  });

  afterAll(async () => {
    await db.close();
  });

  test("should define a valid model", async () => {
    const user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: 1234567890,
      username: "johndoe",
      password: "password",
    });

    expect(user).toBeDefined();
    expect(user.user_id).toBeDefined();
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.phoneNumber).toBe(1234567890);
    expect(user.username).toBe("johndoe");
    expect(user.role).toBe("user");
    expect(user.emailVerified).toBe(false);
  });

  test("should authenticate user with valid credentials", async () => {
    // const hashedPassword = await bcrypt.hash("password", 10);
    await User.create({
      username: "faraahh",
      password: "password",
      firstName: "farah11",
      lastName: "yasin",
      email: "farah.rose2001@gmail.com",
      phoneNumber: 798252095,
    });

    const authenticatedUser = await User.authenticateBasic(
      "faraahh",
      "password"
    );
    expect(authenticatedUser).toBeDefined();
    expect(authenticatedUser.username).toBe("faraahh");
  });

  test("should not authenticate user with invalid credentials", async () => {
    await User.create({
        username: "faraahh",
        password: "passwordd",
        firstName: "farah11",
        lastName: "yasin",
        email: "farah.rose2001@gmail.com",
        phoneNumber: 798252095,
    });

    await expect(
      User.authenticateBasic("johndoe", "wrongpasswords")
    ).rejects.toThrow("Invalid Login");
    await expect(
      User.authenticateBasic("unknownuser", "password")
    ).rejects.toThrow("Invalid Login");
  });

  test("should generate token for user", async () => {
    const user = await User.create({
       username: "faraahh",
      password: "password",
      firstName: "farah11",
      lastName: "yasin",
      email: "farah.rose2001@gmail.com",
      phoneNumber: 798252095,
      role: "user",
      user_id: 1,
    });

    const token = user.token;
    expect(token).toBeDefined();

    const decodedToken = jwt.verify(token, "secret");
    expect(decodedToken.user_id).toBe(user.user_id);
    expect(decodedToken.role).toBe("user");
  });

  test("should authenticate user with valid token", async () => {
    const user = await User.create({
        username: "faraahh",
        password: "password",
        firstName: "farah11",
        lastName: "yasin",
        email: "farah.rose2001@gmail.com",
        phoneNumber: 798252095,
      role: "user",
      user_id: 1,
    });

    const token = user.token;
    const authenticatedUser = await User.authenticateToken(token);
    expect(authenticatedUser).toBeDefined();
    expect(authenticatedUser.username).toBe("faraahh");
  });

  
});
