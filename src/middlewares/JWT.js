import jwt from "jsonwebtoken"
import Usuario from "../models/Usuario.js"
import Estudiante from "../models/Estudiante.js"

const crearTokenJWT = (id, rol) => {

    return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const verificarTokenJWT = async (req, res, next) => {
    
    const { authorization } = req.headers
		
    if (!authorization) 
        return res.status(401).json({ msg: "Acceso denegado: token no proporcionado o inválido" })

    try {
        const token = authorization.split(" ")[1];
        const { id, rol } = jwt.verify(token,process.env.JWT_SECRET)

        req.auth = { id, rol }
        
        if (rol === "usuario") {
            req.usuarioBDD = await Usuario.findById(id).lean().select("-password")
            return next()
        }else if (rol === "estudiante") {
            req.estudianteBDD = await Estudiante.findById(id).lean().select("-password")
            return next()
        }
    } catch (error) {
        return res.status(401).json({ msg: "Token inválido o expirado" });
    }
}


export { 
    crearTokenJWT,
    verificarTokenJWT 
}

