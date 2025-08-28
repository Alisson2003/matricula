import mongoose from 'mongoose' 

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

// server.js o index.js
console.log("PORT:", process.env.PORT);
console.log("MONGO_DB_URL:", process.env.MONGO_DB_URL);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);


export default  connection