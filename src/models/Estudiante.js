import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const estudianteSchema = new Schema({
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
    cedula:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    telefono:{
        type:String,
        default:'',
    },
    status:{ 
        type:Boolean, 
        default: true
    }, 
    confirmEmail:{
        type:Boolean,
        default:false   
    },
    token:{
        type:String,
        default:null
    },
    rol:{
        type:String,
        default:'estudiante'
    }
},{
    timestamps:true
})

// Método para cifrar el password
estudianteSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}


// Método para verificar si el password es el mismo de la BDD
estudianteSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


// Método para crear un token 
estudianteSchema.methods.createToken= function(){
    const tokenGenerado = Math.random().toString(10).slice(2)
    this.token = tokenGenerado
    return tokenGenerado
}

export default model('Estudiante',estudianteSchema)