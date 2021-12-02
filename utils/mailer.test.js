const ConfigUtil = require('../config');
const MailerUtil = require('./mailer');
const Tools = require('./tools');

describe('getHtmlContent', () => {
  it('should return false if no HTML file is found', () => {
    const htmlContent = MailerUtil.getHtmlContent('loof');
    expect(htmlContent).toEqual(false);
  });

  it('should return the HTML content of the wanted file', () => {
    const htmlContent = MailerUtil.getHtmlContent(__dirname + '/../public/mails/test');
    expect(htmlContent).toEqual(expect.stringContaining("A test message with a variable"));
  });
  it('should replace the variables in the HTML template', () => {
    const randomString = Tools.randomString(Tools.randomBetween(10,20));
    const htmlContent = MailerUtil.getHtmlContent(__dirname + '/../public/mails/test', {testVariable: randomString});
    expect(htmlContent).toEqual(expect.stringContaining("A test message with a variable : "+randomString));
  });
  it('should not guess the image path if requested', () => {
    const htmlContent = MailerUtil.getHtmlContent(__dirname + '/../public/mails/test', {imagesAutoPath: false});
    expect(htmlContent).toEqual(expect.stringContaining('<img src="images/test.jpg" />'));
  });
  it('should set a specific image path', () => {
    const htmlContent = MailerUtil.getHtmlContent(__dirname + '/../public/mails/test', {imagesPath: "https://domain.com/images/"});
    expect(htmlContent).toEqual(expect.stringContaining('<img src="https://domain.com/images/test.jpg" />'));
  });
});
describe('getHtmlContent depending on environment', () => {
  afterEach(() => {
    ConfigUtil.unmock();
  });

  it('should guess the image path with the provided application URL', () => {
    ConfigUtil.mock({
      application:{
        url: "https://localhost:3000/"
      }
    });
    const htmlContent = MailerUtil.getHtmlContent(__dirname + '/../public/mails/test');
    expect(htmlContent).toEqual(expect.stringContaining('<img src="https://localhost:3000/mails/test/images/test.jpg" />'));
  });
  it('should fallback guess the image path with the provided redirectToDomain', () => {
    ConfigUtil.mock({
      application:{
        redirectToDomain: "domain"
      }
    });
    const htmlContent = MailerUtil.getHtmlContent(__dirname + '/../public/mails/test');
    expect(htmlContent).toEqual(expect.stringContaining('<img src="https://domain/mails/test/images/test.jpg" />'));
  });
});