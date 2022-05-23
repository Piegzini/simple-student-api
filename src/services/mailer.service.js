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
                user: 'simple.api.07@gmail.com',
                pass: 'ayGfeHB9n',
            },
        });
    }

    getOptions(email, token, expires) {
        return {
            from: 'Simple Api <simple.api.07@gmail.com>',
            to: `${email}`,
            subject: 'Welcome to Simple Api',
            html: `
            <html lang="en">
                <body>
                    <h3>This is your api token:  </h3>
                    <h5>${token}</h5>
                    <p>It expires: ${expires}</p>
                    <p>Have fun!</p>
                </body>
            </html>`,
        };
    }

    async send(_email, _token, _expires) {
        const options = this.getOptions(_email, _token, _expires);
        return await this.transporter.sendMail(options);
    }
}

module.exports = MailerService;
