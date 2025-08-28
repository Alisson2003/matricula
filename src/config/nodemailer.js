import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    //host: process.env.HOST_MAILTRAP,
    //port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
})

const sendMailToRegister = async (userMail, token) => {
    try {
        const mailOptions = {
            from: 'admin@matriculas.com',
            to: userMail,
            subject: "GESTIÓN DE MATRÍCULAS - Confirmación de cuenta ✔",
            html: `
                <h2>Bienvenido al sistema de matrículas 🎓</h2>
                <p>Hola, haz clic <a href="${process.env.URL_BACKEND}confirmar/${token}">aquí
                </a> 
                para confirmar tu cuenta y comenzar a gestionar tus matrículas.</p>
                <hr>
                <footer>El equipo de GESTIÓN DE MATRÍCULAS te da la más cordial bienvenida.</footer>
            `
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(`Mensaje enviado satisfactoriamente: ${info.messageId}`)
    } catch (error) {
        console.error(`Error al enviar el correo: ${error}`)
    }
}

const sendMailToRegisterEst = async (userMail, token) => {
    try {
        const mailOptions = {
            from: 'admin@matriculas.com',
            to: userMail,
            subject: "GESTIÓN DE MATRÍCULAS - Confirmación de cuenta ✔",
            html: `
                <h2>Bienvenido al sistema de matrículas - Estudiante 🎓</h2>
                <p>Hola, haz clic <a href="${process.env.URL_BACKEND}confirmar/${token}">aquí
                </a> 
                para confirmar tu cuenta y comenzar a gestionar tus matrículas.</p>
                <hr>
                <footer>El equipo de GESTIÓN DE MATRÍCULAS te da la más cordial bienvenida.</footer>
            `
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(`Mensaje enviado satisfactoriamente: ${info.messageId}`)
    } catch (error) {
        console.error(`Error al enviar el correo: ${error}`)
    }
}

export {
    sendMailToRegister, 
    sendMailToRegisterEst 
};
