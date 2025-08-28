// Requerir módulos
import express from 'express'
import cors from 'cors';
import routerUsuario from './routers/usuario_routes.js';  
import routerEstudiante from './routers/estudiante_routes.js';    
import routerMateria from './routers/materia_routes.js';    
import routerMatricula from './routers/matricula_routes.js';



// Inicializaciones
const app = express()


// Configuraciones 



// Middlewares 
app.use(express.json())
app.use(cors())



// Variables globales
app.set('port',process.env.PORT || 3000)



// Rutas 
app.get('/',(req,res)=> res.send("Server on"))

// Rutas para veterinarios
app.use('/api',routerUsuario)
app.use('/api',routerEstudiante)
app.use('/api',routerMateria)
app.use('/api',routerMatricula) 

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))


// Exportar la instancia de express por medio de app
export default  app