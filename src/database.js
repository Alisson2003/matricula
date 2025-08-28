import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config(); 

mongoose.set('strictQuery', true)

const connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    console.log('Conexión a la base de datos exitosa');
    
    } catch (error) {
        console.log(error);
    }
}

export default  connection