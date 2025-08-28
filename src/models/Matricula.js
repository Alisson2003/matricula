import {Schema, model} from 'mongoose'

const matriculaSchema = new Schema({
    estudiante:{
        type: Schema.Types.ObjectId,
        ref:"Estudiante",
        required:true
    },
    materia:{
        type: Schema.Types.ObjectId,
        ref:"Materia",
        required:true
    },
    fecha:{
        type: Date,
        default: Date.now
    }, 
    estado:{
        type:String,
        enum:["matriculado","retirado","cursando"],
        default:"matricula"
    }
},{
    timestamps:true
})

matriculaSchema.index({ estudiante: 1, materia: 1 }, { unique: true })

export default model('Matricula',matriculaSchema)