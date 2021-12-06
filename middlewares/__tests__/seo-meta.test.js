const ConfigUtil = require('../../config');
const seoMetaMiddleware = require('../seo-meta');
const SEOMetaModel = require('../../models/seo-meta');

describe('SEO meta middleware', () => {
  let mockReq;
  let mockRes;
  const mockNext = jest.fn();

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      locals: {},
      render: jest.fn()
    };
  });
  afterEach(() => {
    ConfigUtil.unmock();
    mockNext.mockReset();
  });

  it('should inject basic SEO meta for a generic route with specified locale', () => {
    mockReq.locale = 'fr_fr';
    mockReq.protocol = 'https';
    mockReq.headers = {host:"domain.com"};
    mockReq.originalUrl = "/some/generic/route/";
    
    seoMetaMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.locals.meta.html.title).toEqual(SEOMetaModel['fr_fr'].html.title);
  });
  it('should inject specific SEO meta for a specific route with specified locale', () => {
    mockReq.locale = 'fr_fr';
    mockReq.protocol = 'https';
    mockReq.headers = {host:"domain.com"};
    mockReq.originalUrl = "/test";
    
    seoMetaMiddleware(mockReq, mockRes, mockNext);
    expect(mockRes.locals.meta.html.title).toEqual(SEOMetaModel['fr_fr'].test.html.title);
  });
});