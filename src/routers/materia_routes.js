import { Router } from "express";
import { crearMateria, listarMaterias, obtenerMateria, actualizarMateria,
    eliminarMateria } from "../controllers/materia_controller.js";
import { verificarTokenJWT } from "../middlewares/JWT.js";

const router = Router();

router.post("/crear", verificarTokenJWT, crearMateria);
router.get("/listar", verificarTokenJWT, listarMaterias);
router.get("/:id", verificarTokenJWT, obtenerMateria);
router.put("/actualizar/:id", verificarTokenJWT, actualizarMateria);
router.delete("/eliminar/:id", verificarTokenJWT, eliminarMateria);

export default router;
