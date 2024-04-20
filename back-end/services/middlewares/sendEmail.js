import nodemailer from 'nodemailer';

export const sendEmail = async (author) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL_USERNAME,
            pass: process.env.SMTP_MAIL_PASSWORD
        }
    });
    try {
        const emailSender = await transporter.sendMail({
            from: 'prova <earnest.wisozk@ethereal.email>',
            to: author,
            subject: 'Email prova',
            html: 'la mia mail bellissima!!'
        })
        console.log(emailSender.messageId)
    } catch (error) {
        console.error(error)
    }
}