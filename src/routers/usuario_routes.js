import {Router} from 'express'
import { registro, confirmarMail, login } from '../controllers/usuario_controller.js'
const router = Router()


router.post('/registro',registro)
router.get('/confirmar/:token',confirmarMail)
router.post('/login', login)


export default router;