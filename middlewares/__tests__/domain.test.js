const ConfigUtil = require('../../config');
const domainMiddleware = require('../domain');

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

    domainMiddleware(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
  });
  it('should next if in production but no redirectToDomain specified', () => {
    ConfigUtil.mock({production: true, application:{redirectToDomain:null}});

    domainMiddleware(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
  });
  it('should next if the hostname is the same as the requested domain', () => {
    ConfigUtil.mock({production: true, application:{redirectToDomain:'domain'}});
    mockReq.hostname = "domain";

    domainMiddleware(mockReq, mockRes, mockNext);
    expect(mockNext).toBeCalledTimes(1);
  });
  it('should redirect to the requested domain if the hostname isn‘t the same as the requested domain', () => {
    ConfigUtil.mock({production: true, application:{redirectToDomain:'domain'}});
    mockReq = {
      hostname: "otherDomain",
      originalUrl: "/a/specific/route",
      protocol: "https"
    };

    domainMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.redirect).toBeCalledWith(301, `${mockReq.protocol}://${ConfigUtil.config.application.redirectToDomain}${mockReq.originalUrl}`);
  });
  it('should redirect to the requested domain with SSL if the hostname isn‘t the same as the requested domain and SSL is enabled', () => {
    ConfigUtil.mock({production: true, application:{redirectToDomain:'domain', forceSSLRedirection: true}});
    mockReq = {
      hostname: "otherDomain",
      originalUrl: "/a/specific/route",
      protocol: "http"
    };

    domainMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.redirect).toBeCalledWith(301, `https://${ConfigUtil.config.application.redirectToDomain}${mockReq.originalUrl}`);
  });
});