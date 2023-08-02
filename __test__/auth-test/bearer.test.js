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

  test('should call next() with "Invalid Login" if authorization header is missing', async () => {
    await middleware(req, res, next);

    expect(users.model.authenticateToken).not.toHaveBeenCalled();
    expect(req.user).toBeUndefined();
    expect(req.token).toBeUndefined();
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  test('should call next() with "Invalid Login" if authentication fails', async () => {
    const token = 'invalidToken';

    req.headers.authorization = `Bearer ${token}`;
    users.model.authenticateToken = jest.fn().mockRejectedValue(new Error('Authentication failed'));

    await middleware(req, res, next);

    expect(users.model.authenticateToken).toHaveBeenCalledWith(token);
    expect(req.user).toBeUndefined();
    expect(req.token).toBeUndefined();
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
});

