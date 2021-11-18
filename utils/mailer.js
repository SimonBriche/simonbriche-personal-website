const fs = require('fs');
const nodemailer = require('nodemailer');
const config = require('../config');

module.exports = {
  /**
   * Get the content of the HTML template located in htmlLocation and inject the variables' values.
   * @param {string} htmlLocation The path to the HTML template folder
   * @param {Object} variables Variables to be injected in the HTML template. All the variables properties' values will replace the string '{{property}}'
   * @returns {string} A string that represents the HTML template with the injected variables.
   */
  getHtmlContent: function(htmlLocation, variables){
    let htmlContent = fs.readFileSync(htmlLocation+'/index.html');

    if(htmlContent){
      htmlContent = htmlContent.toString();
      //variables replacement
      Object.keys(variables).forEach(key => {
        htmlContent = htmlContent.replace(new RegExp('{{'+key+'}}', 'g'), variables[key]);
      });
      //images path
      let imagesPath;
      // if imagesPath is provided
      if(variables && variables.imagesPath){
        imagesPath = variables.imagesPath;
      }
      //try to figure it out with the html path
      else{
        //if we want autoPath
        if(!variables || (variables && variables.imagesAutoPath !== false)){
          //guess images absolute URL with ENV.APPLICATION_URL or ENV.REDIRECT_TO_DOMAIN
          const applicationURL = (config.application.url || `https://${config.application.redirectToDomain}/`);
          if(applicationURL){
            //trim start of the path
            imagesPath = htmlLocation.substr(htmlLocation.indexOf('public/')).replace('public/','');
            //add absolute application URL
            imagesPath = applicationURL+imagesPath;
            //add image folder
            imagesPath = imagesPath + '/images/';
          }
        }
      }
      //replace the default path by imagesPath if found
      if(imagesPath){
        htmlContent = htmlContent.replace(/images\//g, imagesPath);
      }
      
      return htmlContent;
    }
    else{
      return false;
    }
  },
  /**
   * Send an email based on the config.mail parameters, with the EU Mailgun service by default.
   * @param {Object} mailOptions An object that contains necessary informations to send the mail.
   * @param {string} mailOptions.host Host of the mailing service. Defaults to config.mail.host or "smtp.eu.mailgun.org"
   * @param {number} mailOptions.port Port of the mailing service. Defaults to 465
   * @param {boolean} mailOptions.secure If true the connection will use TLS when connecting to server. Defaults to true.
   * @param {string} mailOptions.from Contact of the sender
   * @param {string} mailOptions.to Recipient of the email, could be multiple emails, comma separated.
   * @param {string} mailOptions.subject Subject of the email
   * @param {string} mailOptions.htmlPath Path to the folder where the HTML template is located, that will be used for the HTML part of the email.
   * @param {Object} mailOptions.variables Variables to be injected in the HTML template. All the variables properties' values will replace the string '{{property}}'
   * @returns {Object} Informations about the sent email.
   */
  sendMail: function(mailOptions){
    return new Promise(function(resolve, reject){
      (async function(){
        const transporter = nodemailer.createTransport({
          //service 'Mailgun' EU by default
          host: mailOptions.host || config.mail.host || "smtp.eu.mailgun.org",
          port: mailOptions.port || 465,
          secure: !(mailOptions.secure === false),
          auth: {
            user: mailOptions.login || config.mail.smtpLogin,
            pass: mailOptions.password || config.mail.smtpPassword
          }
        });
        
        //TODO: generate mirror link
        if(mailOptions && mailOptions.htmlPath){
          mailOptions.html = this.getHtmlContent(mailOptions.htmlPath, mailOptions.variables);
        }
        if(config.mail.active){
          const mailSent = await transporter.sendMail(mailOptions);
          resolve(mailSent);
        }
        else{
          _logger.info('Mailer is inactive, check your ACTIVE_MAIL environment variable');
          resolve(true);
        }
      }.bind(this))().catch(reject);
    }.bind(this));
  }
};