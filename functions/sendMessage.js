const { accessToken } = require('../configs/access.config');
const nodemailer = require("nodemailer");
const emailFrom = "ushinigami97@gmail.com";
const emailService = "phanhaingan@gmail.com";

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: emailFrom,
        clientId: process.env.clientID,
        clientSecret: process.env.clientSecret,
        refreshToken: process.env.refreshToken,
        accessToken: accessToken
    }
});


function sendBackContactEmail(name, email) {
    const mailOptions = {
        from: emailFrom,
        to: email,
        subject: 'Thank you for contacting us at Sonriceart',
        generateTextFromHTML: true,
        html: `<h3><em>Dear ${name},</em></h3><p>Thank you for subscription to Sonriceart, soon you get all the news from our site</p>`
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
}


function sendContactMail(name, email, subject, message) {
    const mailOptions = {
        from: emailFrom,
        to: emailService,
        subject: subject,
        generateTextFromHTML: true,
        html: message
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        //smtpTransport.close();
    });
    sendBackContactEmail(name, email);
}

module.exports = { sendContactMail };