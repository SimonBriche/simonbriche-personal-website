const ConfigUtil = require('../../config');
const localeMiddleware = require('../locale');

describe('locale middleware', () => {
  let mockReq;
  let mockRes;
  const mockNext = jest.fn();

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      locals: {},
      redirect: jest.fn()
    };
  });
  afterEach(() => {
    ConfigUtil.unmock();
    localeMiddleware.clearLocaleCache();
    mockNext.mockReset();
  });

  it('should next and locale be fr_fr if no locale is provided', () => {
    localeMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReq.locale).toEqual('fr_fr');
    expect(mockRes.locals.locale).toEqual('fr_fr');
  });
  
  it('should next and locale be en_en if en_en locale is provided for the requested domain', () => {
    ConfigUtil.mock({application:{localeDomains:'[{"domain":"en-domain","locale":"en_en"}]'}});
    mockReq.hostname = "en-domain";
    
    localeMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReq.locale).toEqual('en_en');
    expect(mockRes.locals.locale).toEqual('en_en');
  });

  it('should next and locale be de_de if de_de locale is provided for the requested subfolder', () => {
    ConfigUtil.mock({application:{localeSubfolders:'[{"folder":"de","locale":"de_de"}]'}});
    mockReq.path = mockReq.url = "/de/some-route";

    localeMiddleware(mockReq, mockRes, mockNext);

    expect(mockNext).toBeCalledTimes(1);
    expect(mockReq.locale).toEqual('de_de');
    expect(mockRes.locals.locale).toEqual('de_de');
  });
});