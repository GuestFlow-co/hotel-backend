const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../src/models/users"); // Update the path to the userModel module accordingly

describe("userModel", () => {
  let sequelize;
  let User;

  beforeAll(() => {
    // Create a new Sequelize instance and connect to an in-memory database
    sequelize = new Sequelize("sqlite::memory:");
    User = userModel(sequelize, DataTypes);
  });

  afterAll(async () => {
    // Close the database connection
    await sequelize.close();
  });

  test("should define the model with all properties", () => {
    expect(User).toBeDefined();
    expect(User.tableName).toBe("users");

    const attributes = User.rawAttributes;
    expect(attributes.user_id).toBeDefined();
    expect(attributes.firstName).toBeDefined();
    expect(attributes.lastName).toBeDefined();
    expect(attributes.email).toBeDefined();
    expect(attributes.phoneNumber).toBeDefined();
    expect(attributes.username).toBeDefined();
    expect(attributes.password).toBeDefined();
    expect(attributes.role).toBeDefined();
  });

  test("should generate a valid token", () => {
    const user = User.build({
      username: "testuser",
      role: "user",
    });

    const token = user.token;
    expect(token).toBeTruthy();

    const decodedToken = jwt.verify(token, process.env.SECRET || "secret");
    expect(decodedToken.username).toBe("testuser");
  });

  test("should return correct capabilities based on role", () => {
    const user = User.build({
      role: "admin",
    });

    expect(user.capabilities).toEqual(["read", "create", "update", "delete"]);
  });

  test("should hash the password before creating a user", async () => {
    
    const user = User.build({
      username: "testuser",
      password: "testpassword",
      firstName: "farah",
      lastName: "yasin",
      phoneNumber: "55555",
      email: "farah@gmail.com",
    });
  
    // The number of salt rounds to use for hashing
    const saltRounds = 10;
   user.password = await bcrypt.hash(user.password, saltRounds);
    await user.save();
    const dbUser = await User.findOne({ where: { username: "testuser" } });
  
    expect(dbUser.password).not.toBe("testpassword");
    const isValidPassword = await bcrypt.compare("testpassword", dbUser.password);
    expect(isValidPassword).toBe(true);
  });
  
  
  test("should authenticate user with valid credentials using authenticateBasic method", async () => {
    const user = User.build({
      username: "testuser",
      password: "testpassword",
      firstName:"farah",
      lastName:"yasin",
      phoneNumber:"55555",
      email:"farah@gmail.com"
    });

    await user.save();

    const authenticatedUser = await User.authenticateBasic("testuser", "testpassword");
    expect(authenticatedUser).toBeTruthy();
    expect(authenticatedUser.username).toBe("testuser");
  });

  test("should throw an error when trying to authenticate with invalid credentials using authenticateBasic method", async () => {
    await expect(User.authenticateBasic("invaliduser", "invalidpassword")).rejects.toThrow(
      "Invalid User"
    );
  });

  test("should authenticate user with a valid token using authenticateToken method", async () => {
    const user = User.build({
      username: "testuser",
      role: "user",
    });

    const token = jwt.sign({ username: "testuser" }, process.env.SECRET || "secret");
    user.token = token;

    await user.save();

    const authenticatedUser = await User.authenticateToken(token);
    expect(authenticatedUser).toBeTruthy();
    expect(authenticatedUser.username).toBe("testuser");
  });

  test("should throw an error when trying to authenticate with an invalid token using authenticateToken method", async () => {
    const invalidToken = "invalidtoken";
    await expect(User.authenticateToken(invalidToken)).rejects.toThrow("User Not Found");
  });
});
