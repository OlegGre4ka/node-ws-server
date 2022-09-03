const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMPT_USER, // generated ethereal user
                pass: process.env.SMPT_PASSWORD, // generated ethereal password
            },
        })
    }
    async sendActivationMail(emailTo, link) {
        await this.transporter.sendMail({
            from: process.env.SMPT_USER, // sender address
            to: emailTo, // list of receivers
            secure: false,
            subject: "Активація акаунта на Сімейна Толока(Family Talking)", // Subject line
            text: "", // plain text body
            html:
                `<div style="display: flex; justif-content: center; width: 100%; background-color: purple; padding: 15px;">
                    <div>
                        <h2 style="width: 100%; text-align: center; color: white;">Щоб активувати акаунт перейдіть за посиланням</h2>
                        <a href=${link} style="width: 100%; text-align: center; color:lightblue; font-size: 16px;">${link}</a>
                    </div>
                </div>`

            //             `<!doctype html>
            // <html ⚡4email>
            //   <head>
            //     <meta charset="utf-8">
            //     <style amp4email-boilerplate>body{visibility:hidden}</style>
            //     <script async src="https://cdn.ampproject.org/v0.js"></script>
            //     <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
            //   </head>
            //   <body>
            //   <div style={{backgroundColor:"purple"}}>
            //       <h2 style={{color:"white"}}>Щоб активувати акаунт перейдіть за посиланням</h2>
            //       <a href=${link} style={{color:"lightblue"}}>${link}</a>
            //   </div>
            //   </body>
            // </html>`
        })
    }
}

module.exports = new MailService();