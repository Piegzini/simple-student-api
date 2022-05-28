const nodemailer = require('nodemailer');
const pug = require('pug');
const { join } = require('path');
require('dotenv').config();

class MailerService {
    constructor() {
        this.transporter = {};
        this.init();
    }

    init() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_NAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    getOptions(email, token, expires) {
        return {
            from: 'Simple Api <simple.api.07@gmail.com>',
            to: `${email}`,
            subject: 'Your Simple API Token',
            html: pug.renderFile(join(__dirname, 'emails/welcome.pug'), {
                token,
                expires,
            }),
        };
    }

    async send(_email, _token, _expires) {
        const options = this.getOptions(_email, _token, _expires);
        const { response } = await this.transporter.sendMail(options);
        return parseInt(response.split(' ')[0]);
    }
}

module.exports = MailerService;
