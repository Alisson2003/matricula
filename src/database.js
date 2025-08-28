import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        if (!process.env.MONGO_DB_URL) throw new Error("MONGO_DB_URL no definida");

        const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ Conexión a DB exitosa: ${conn.connection.host}`);

    } catch (error) {
        console.error("❌ Error de conexión a la DB:", error);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

export default connection;
