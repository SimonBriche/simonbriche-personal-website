const {config} = require('../../config');
const MailerUtil = require('../../utils/mailer');

const resolvers = {
  Mutation: {
    sendContactMessage: async (root, {input}, context, info) => {
      const mailOptions = {
        from: 'Contact <noreply@6pans.fr>',
        to: config.mail.supportEmail,
        subject: `Nouveau message de contact de l'application ${config.application.url}`,
        htmlPath: './public/mails/contact',
        variables: input
      };
      
      if(mailOptions.variables.message){
        mailOptions.variables.message = mailOptions.variables.message.replace(/(?:\r\n|\r|\n)/g, '<br />');
      }

      await MailerUtil.sendMail(mailOptions);
      return true;
    },
  }
}

module.exports = resolvers