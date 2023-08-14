const middleware = require('../../src/auth/basic');
const { users } = require('../../src/models');

describe('Authentication Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call next() if valid authorization header is provided', async () => {
    const user = 'testuser';
    const pass = 'testpass';

    const encodedCredentials = Buffer.from(`${user}:${pass}`).toString('base64');
    req.headers.authorization = `Basic ${encodedCredentials}`;

    users.model.authenticateBasic = jest.fn().mockResolvedValue({ username: user });

    await middleware(req, res, next);

    expect(users.model.authenticateBasic).toHaveBeenCalledWith(user, pass);
    expect(req.user).toEqual({ username: user });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test('should respond with status 403 and error message if invalid authorization header is provided', async () => {
    req.headers.authorization = null;

    await middleware(req, res, next);

    expect(users.model.authenticateBasic).not.toHaveBeenCalled();
    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid Login');
  });

  test('should respond with status 403 and error message if authentication fails', async () => {
    const user = 'testuser';
    const pass = 'testpass';

    const encodedCredentials = Buffer.from(`${user}:${pass}`).toString('base64');
    req.headers.authorization = `Basic ${encodedCredentials}`;

    users.model.authenticateBasic = jest.fn().mockRejectedValue(new Error('Authentication failed'));

    await middleware(req, res, next);

    expect(users.model.authenticateBasic).toHaveBeenCalledWith(user, pass);
    expect(req.user).toBeUndefined();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Invalid Login');
  });



  test('should call next() if valid authorization header is provided', async () => {
    const user = 'farah';
    const pass = '123';

    const encodedCredentials = Buffer.from(`${user}:${pass}`).toString('base64');
    req.headers.authorization = `Basic ${encodedCredentials}`;

    users.model.authenticateBasic = jest.fn().mockResolvedValue({ username: user });

    await middleware(req, res, next);

    expect(users.model.authenticateBasic).toHaveBeenCalledWith(user, pass);
    expect(req.user).toEqual({ username: user });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test('test', async () => {
    const user = 'aya';
    const pass = '124';

    const encodedCredentials = Buffer.from(`${user}:${pass}`).toString('base64');
    req.headers.authorization = `Basic ${encodedCredentials}`;

    users.model.authenticateBasic = jest.fn().mockResolvedValue({ username: user });

    await middleware(req, res, next);

    expect(users.model.authenticateBasic).toHaveBeenCalledWith(user, pass);
    expect(req.user).toEqual({ username: user });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

});