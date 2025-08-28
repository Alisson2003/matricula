
import Usuario from "../models/Usuario.js"
import Estudiante from "../models/Estudiante.js"
import {sendMailToRegister} from "../config/nodemailer.js"
import { crearTokenJWT } from "../middlewares/JWT.js"

const registro = async (req,res)=>{
    const {email,password} = req.body
    console.log(' req.body:', req.body); 

    //2
    if (Object.values(req.body).includes("")) 
        return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    const usuarioEmailBDD = await Usuario.findOne({email})
    if(usuarioEmailBDD) 
        return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    //3    
    const nuevoUsuario = await Usuario(req.body)
    
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);


    const token = nuevoUsuario.createToken()
    await sendMailToRegister(email,token)

    await nuevoUsuario.save()
    //4
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}

const confirmarMail = async (req,res)=>{
    //1
    if (!(req.params.token)) 
        return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    //2
    const usuarioBDD = await Usuario.findOne({token:req.params.token})

    if(!usuarioBDD?.token) 
        return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    //3
    usuarioBDD.token = null
    usuarioBDD.confirmEmail=true
    await usuarioBDD.save()
    //4
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"})
}

const login = async(req,res)=>{

    const {email,password} = req.body;

    if (Object.values(req.body).includes("")) 
        return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    
    // j

    let cuenta = await Usuario.findOne( {email} )
    let tipo = 'usuario'

    if(!cuenta){
        cuenta = await Estudiante.findOne( {email} )        
        tipo = 'estudiante'
    }

    if(!cuenta) 
        return res.status(404).json({msg:"Lo sentimos, la cuenta ingresada no se encuentra registrado"})         

    if(cuenta?.confirmEmail===false)
        return res.status(403).json({msg:"Lo sentimos, debe verificar su cuenta"})
    
    const verificarPassword = await cuenta.matchPassword(password)

    if(!verificarPassword) 
        return res.status(401).json({msg:"Lo sentimos, el password no es el correcto"})
        
    const token = crearTokenJWT(cuenta._id,cuenta.rol || tipo)

    res.status(200).json({
        token,
        nombre: cuenta.nombre || cuenta.nombre || "",
        apellido: cuenta.apellido || cuenta.apellido || "",
        celular: cuenta.telefono || cuenta.telefono || "",
        _id: cuenta._id,
        rol: cuenta.rol || tipo
    })
}

export {
    registro,
    confirmarMail,
    login
}