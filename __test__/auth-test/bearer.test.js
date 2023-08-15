const middleware = require('../../src/auth/bearer');
const { users } = require('../../src/models');

describe('Authentication Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call next() with valid user and token if authorization header is provided', async () => {
    const token = 'validToken';
    const validUser = { username: 'testuser', token };

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockResolvedValue(validUser);

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(validUser);
    expect(req.token).toEqual(token);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should call next() with a different valid user and token', async () => {
    const token = 'anotherValidToken';
    const validUser = { username: 'anotheruser', token };

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockResolvedValue(validUser);

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(validUser);
    expect(req.token).toEqual(token);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should call next() with yet another valid user and token', async () => {
    const token = 'yetAnotherValidToken';
    const validUser = { username: 'yetanotheruser', token };

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockResolvedValue(validUser);

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(validUser);
    expect(req.token).toEqual(token);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should call next() with valid user and token for a different token format', async () => {
    const token = 'newTokenFormat';
    const validUser = { username: 'newuser', token };

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockResolvedValue(validUser);

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(validUser);
    expect(req.token).toEqual(token);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should call next() with valid user and token for another token format', async () => {
    const token = 'differentTokenFormat';
    const validUser = { username: 'differentuser', token };

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockResolvedValue(validUser);

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toEqual(validUser);
    expect(req.token).toEqual(token);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test('should call next() with "Invalid Login" if authorization header is missing', async () => {
    await middleware(req, res, next);

    expect(users.model.authenticateToken).not.toHaveBeenCalled();
    expect(req.user).toBeUndefined();
    expect(req.token).toBeUndefined();
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  test('should call next() with "Invalid Login" if authentication fails with an error', async () => {
    const token = 'invalidToken';

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockRejectedValue(new Error('Authentication failed'));

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toBeUndefined();
    expect(req.token).toBeUndefined();
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  // Additional test cases for edge cases and scenarios

  test('should call next() with "Invalid Login" if token is empty', async () => {
    req.headers.authorization = 'Bearer ';

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalled();
    expect(req.user).toBeUndefined();
    expect(req.token).toBeUndefined();
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  test('should call next() with "Invalid Login" if authentication throws an unexpected error', async () => {
    const token = 'validToken';

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockRejectedValue(new Error('Unexpected error'));

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toBeUndefined();
    expect(req.token).toBeUndefined();
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
});
