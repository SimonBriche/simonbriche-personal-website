const ConfigUtil = require('../../config');
const httpsMiddleware = require('../https');

describe('domain middleware', () => {
  let mockReq;
  let mockRes;
  const mockNext = jest.fn();

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      redirect: jest.fn()
    };
  });
  afterEach(() => {
    ConfigUtil.unmock();
    mockNext.mockReset();
  });

  it('should next if not in production', () => {
    ConfigUtil.mock({production: false});

    httpsMiddleware(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
  });

  it('should next if in production and secure', () => {
    ConfigUtil.mock({production: true});
    mockReq.secure = true;
    
    httpsMiddleware(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
  });

  it('should next if in production, unsecure but SSL not required', () => {
    ConfigUtil.mock({production: true, application:{forceSSLRedirection: false}});
    mockReq.secure = false;

    httpsMiddleware(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
  });

  it('should redirect to the same route with SSL if in production and unsecure', () => {
    ConfigUtil.mock({production: true});
    mockReq = {
      hostname: "domain",
      originalUrl: "/a/specific/route",
      secure: false
    };
    httpsMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.redirect).toBeCalledWith(301, `https://${mockReq.hostname}${mockReq.originalUrl}`);
  });
});