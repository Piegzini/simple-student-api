const nodemailer = require('nodemailer');
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
            html: ` 
            <html lang="en">
                <body>
                    <h3>This is your api token:  </h3>
                    <p>${token}</p>
                    <p>It expires: ${expires}</p>
                    <p>Have fun!</p>
                </body>
            </html>`,
        };
    }

    async send(_email, _token, _expires) {
        const options = this.getOptions(_email, _token, _expires);
        const { response } = await this.transporter.sendMail(options);
        return parseInt(response.split(' ')[0]);
    }
}

module.exports = MailerService;
