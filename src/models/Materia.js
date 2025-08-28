import {Schema, model} from 'mongoose'

const materiaSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    codigo:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    creditos:{
        type:Number,
        required:true,
        default:3   
    },
    status:{ 
        type:Boolean, 
        default:true
    }
},{
    timestamps:true
})

export default model('Materia',materiaSchema)