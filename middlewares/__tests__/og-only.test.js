const ConfigUtil = require('../../config');
const SocialCrawlersModel = require('../../models/social-crawlers');
const ogOnlyMiddleware = require('../og-only');

describe('OG middleware', () => {
  let mockReq;
  let mockRes;
  const mockNext = jest.fn();

  beforeEach(() => {
    mockReq = {query:{}};
    mockRes = {
      render: jest.fn()
    };
  });
  afterEach(() => {
    ConfigUtil.unmock();
    mockNext.mockReset();
  });

  test.each(SocialCrawlersModel)('should render OG only with crawler User Agent %s', (ua) => {
    mockReq.headers = {'user-agent': ua};
    ogOnlyMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.render).toBeCalledWith('og-only');
  });

  it('should next if user agent isn‘t one of the listed ones', () => {
    mockReq.headers = {'user-agent': "a user agent"};
    ogOnlyMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
  });
  it('should render OG only if forced with meta_only GET parameter', () => {
    mockReq.headers = {'user-agent': "a user agent"};
    mockReq.query.meta_only = "1";

    ogOnlyMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.render).toBeCalledWith('og-only');
  });
});