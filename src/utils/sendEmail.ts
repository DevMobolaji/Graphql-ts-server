
import { createTransport } from "nodemailer"

export async function sendEmail(email: string, url: string) {
    return new Promise((resolve, reject) => {
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: "alan08037896270@gmail.com",
                pass: "outvbhuoyvhfvzdg"
            }
        })

        const mailOption = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<a href="${url}">${url}</a>`, // html body
        }
        transporter.sendMail(mailOption, (error) => {
            if (error) {
                return reject({ message: "an error occured"})
            } 
            return resolve({ message: "message sent successfully"})
        })
    })
}