import {Router} from 'express'
import { crearEstudiante, confirmarEstudiante, listarEstudiantes, obtenerEstudiante, actualizarEstudiante,
    eliminarEstudiante } from '../controllers/estudiante_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()


router.post("/crear",crearEstudiante)
router.get("/confirmar/:token",confirmarEstudiante)
router.get("/listar", listarEstudiantes)
router.get("/listar", verificarTokenJWT, listarEstudiantes)
router.get("/:id", verificarTokenJWT, obtenerEstudiante)
router.put("/actualizar/:id", verificarTokenJWT, actualizarEstudiante)
router.delete("/eliminar/:id", verificarTokenJWT, eliminarEstudiante)


export default router;