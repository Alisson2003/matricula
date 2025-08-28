
import { Router } from "express";
import { crearMatricula, listarMatriculas, obtenerMatricula, 
    eliminarMatricula } from "../controllers/matricula_controller.js";
import { verificarTokenJWT } from "../middlewares/JWT.js";

const router = Router();

router.post("/crear", verificarTokenJWT, crearMatricula);
router.get("/listar", verificarTokenJWT, listarMatriculas);
router.get("/:id", verificarTokenJWT, obtenerMatricula);
router.delete("/eliminar/:id", verificarTokenJWT, eliminarMatricula);

export default router;
