import { createTransport } from "nodemailer"
import sanitizedConfig from "../config"

export async function sendEmail(email: string, url: string) {
    return new Promise((resolve, reject) => {
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: sanitizedConfig.EMAIL,
                pass: sanitizedConfig.PASSWORD
            }
        })

        const mailOption = {
            from: '"Trend With Tees 👻" <no-reply-signup@TWT>', // sender address
            to: email, // list of receivers
            subject: "[TWT] Email Verification ✔", // Subject line
            //text: "", // plain text body
            html: `Thanks for signing up for our service, Kindly use the link below to verify your account <br /> <a href="${url}">Verify Email Address</a>`, // html body
        }
        transporter.sendMail(mailOption, (error) => {
            if (error) {
                return reject({ message: "an error occured" })
            }
            return resolve({ message: "message sent successfully" })
        })
    })
}