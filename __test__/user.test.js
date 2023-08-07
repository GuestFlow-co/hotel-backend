const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "default_secret";

const userModel = require("../src/models/users"); // Update the path to the userModel module accordingly
describe("userModel", () => {
    let sequelize;
    let User;
  
    beforeAll(async () => {
      // Set up a test database
      sequelize = new Sequelize("sqlite::memory:");
  
      // Initialize the UserModel with the test database
      User = userModel(sequelize, DataTypes);
  
      // Sync the model with the database (create the table)
      await sequelize.sync();
    });
  
    afterAll(async () => {
      // Close the database connection
      await sequelize.close();
    });
  
    beforeEach(async () => {
      // Clear the user table before each test
      await User.destroy({ where: {} });
    });
// describe("userModel", () => {
//   let sequelize;
//   let User;

//   beforeAll(() => {
//     // Create a new Sequelize instance and connect to an in-memory database
//     sequelize = new Sequelize("sqlite::memory:");
//     User = userModel(sequelize, DataTypes);
//   });

//   afterAll(async () => {
//     // Close the database connection
//     await sequelize.close();
//   });
test("creates a new user", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      username: "john_doe",
      password: "password123",
    };

    const user = await User.create(userData);

    expect(user).toBeDefined();
    expect(user.user_id).toBe(1);
    expect(user.firstName).toBe(userData.firstName);
    expect(user.lastName).toBe(userData.lastName);
    expect(user.email).toBe(userData.email);
    expect(user.phoneNumber).toBe(userData.phoneNumber);
    expect(user.username).toBe(userData.username);
    expect(user.password).not.toBe(userData.password); // should be hashed
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

  test("should hash the password ", async () => {
    
    const user1 =({
      username: "testuser",
      password: "testpassword",
      firstName: "farah",
      lastName: "yasin",
      phoneNumber: "55555",
      email: "farah@gmail.com",
    });
  
    const userData = await User.create(user1);
    const dbUser = await User.findOne({ where: { username: "testuser" } });

    expect(userData.lastName).toBe("yasin");
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
      "Invalid Login"
    );
  });

//   test("should authenticate user with a valid token using authenticateToken method", async () => {
//     const user = User.build({
//         username: "testuser",
//         password: "testpassword",
//         firstName:"farah",
//         lastName:"yasin",
//         phoneNumber:"55555",
//         email:"farah@gmail.com",
//         role:"user"
//     });

//     const token = jwt.sign({ username: "testuser" }, SECRET);
//     user.token = token;

//     await user.save();

//     const authenticatedUser = await User.authenticateToken(token);
//     expect(authenticatedUser).toBeTruthy();
//     expect(authenticatedUser.username).toBe("testuser");
//   });

  test("should throw an error when trying to authenticate with an invalid token using authenticateToken method", async () => {
    const invalidToken = "invalidtoken";
    await expect(User.authenticateToken(invalidToken)).rejects.toThrow("jwt malformed");
  });


  test("returns capabilities based on user role", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      username: "john_doe",
      password: "password123",
      role: "admin",
    };

    const user = await User.create(userData);

    expect(user.capabilities).toEqual(["read", "create", "update", "delete"]);
  });


  test("throws an error for invalid basic authentication", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      username: "john_doe",
      password: "password123",
    };

    await User.create(userData);

    try {
      await User.authenticateBasic(userData.username, "wrong_password");
    } catch (error) {
      expect(error.message).toBe("Invalid Login");
    }
  });

  test("throws an error for invalid token authentication", async () => {
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      username: "john_doe",
      password: "password123",
    };

    await User.create(userData);

    try {
      await User.authenticateToken("invalid_token");
    } catch (error) {
      expect(error.message).toBe("jwt malformed");
    }
  });
});

