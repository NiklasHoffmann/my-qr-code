require("dotenv").config()
const nodemailer = require("nodemailer")

// Erstellen eines SMTP-Transporters
const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        ciphers: "SSLv3",
    },
})

exports.sendVerificationEmail = async (email, verificationLink) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM_ADDRESS,
        to: email,
        subject: "Account Verification",
        html: `<p>Please verify your account by clicking on the following link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent: " + info.response)
        return info
    } catch (error) {
        console.error("Error sending verification email:", error)
        throw error
    }
}
