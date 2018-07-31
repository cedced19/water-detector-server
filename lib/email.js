const nodemailer = require('nodemailer');
const locale = require('../locale.json');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
    }
});

module.exports = (event) => {
    // Send mail
    transporter.sendMail({
        from: `${locale[process.env.LOCALE].name} <${process.env.MAIL_AUTH_USER}>`,
        to: process.env.RECEIVERS,
        subject: locale[process.env.LOCALE].name,
        text: locale[process.env.LOCALE][event]
    }, err => {});
};