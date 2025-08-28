import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"


const usuarioSchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
		unique:true
    },
    password:{
        type:String,
        required:true
    },
    nombre:{
        type:String,    
        required:true,
        trim:true
    },
    apellido:{      
        type:String,
        required:true,
        trim:true
    },
    telefono:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    rol:{
        type:String,
        default:"user"
    }

},{
    timestamps:true
})



// Método para cifrar el password
usuarioSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}


// Método para verificar si el password es el mismo de la BDD
usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


// Método para crear un token 
usuarioSchema.methods.createToken= function(){
    const tokenGenerado = Math.random().toString(10).slice(2)
    this.token = tokenGenerado
    return tokenGenerado
}


export default model('Usuario',usuarioSchema)