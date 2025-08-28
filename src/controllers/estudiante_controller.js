import Estudiante from '../models/Estudiante.js';
import {sendMailToRegisterEst} from "../config/nodemailer.js"

const crearEstudiante = async (req, res) => {
    try {
        const { nombre, apellido, cedula, email, password, telefono } = req.body;
        console.log(' req.body:', req.body);

        if (![nombre, apellido, cedula, email, password, telefono].every(Boolean)) 
            return res.status(400).json({ msg: 'Lo sentimos, debes llenar todos los campos' });

        const existeCedula = await Estudiante.findOne({ cedula });
        if (existeCedula) 
            return res.status(400).json({ msg: 'Cédula ya registrada' });

        const existeEmail = await Estudiante.findOne({ email });
        if (existeEmail) 
            return res.status(400).json({ msg: 'Email ya registrado' });

        const nuevoEstudiante = new Estudiante({ nombre, apellido, cedula, email, telefono });
        nuevoEstudiante.password = await nuevoEstudiante.encryptPassword(password);

        const token = nuevoEstudiante.createToken();
        console.log("Token guardado en BD:", nuevoEstudiante.token);

        await sendMailToRegisterEst(email, token);

        await nuevoEstudiante.save();

        res.status(201).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear estudiante' });
    }
};

const confirmarEstudiante = async (req, res) => {

    console.log("Token recibido:", req.params.token);

    if (!req.params.token) 
        return res.status(400).json({ msg: "Lo sentimos, no se puede validar la cuenta" });

    const estudianteBDD = await Estudiante.findOne({ token: req.params.token });
        console.log("Estudiante encontrado:", estudianteBDD);


    if (!estudianteBDD?.token) 
        return res.status(404).json({ msg: "La cuenta ya ha sido confirmada" });

    estudianteBDD.token = null;
    estudianteBDD.confirmEmail = true;

    await estudianteBDD.save();

    res.status(200).json({ msg: "Token confirmado, ya puedes iniciar sesión" });
};

const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find().select('-password').sort({ createdAt: -1 });
        res.json(estudiantes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al listar estudiantes' });
    }
};

const obtenerEstudiante = async (req, res) => {
    try {
        const id = req.params.id;

        if (req.auth?.rol === 'estudiante' && req.auth.id !== id) {
        return res.status(403).json({ msg: 'No puede ver otros estudiantes' });
        }

        const estudiante = await Estudiante.findById(id).select('-password');

        if (!estudiante) 
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        res.json(estudiante);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener estudiante' });
    }
};

const actualizarEstudiante = async (req, res) => {
    try {
        const id = req.params.id;

        if (req.auth?.rol === 'estudiante' && req.auth.id !== id) {
        return res.status(403).json({ msg: 'No puede editar otros estudiantes' });
        }

        const datos = { ...req.body };
        if (datos.password) {
        
        const est = await Estudiante.findById(id);

        est.password = await est.encryptPassword(datos.password);

        Object.keys(datos).forEach(k => { if (k !== 'password') est[k] = datos[k]; });
        await est.save();

        const resultado = await Estudiante.findById(id).select('-password');
        return res.json(resultado);
        }

        const actualizado = await Estudiante.findByIdAndUpdate(id, datos, { new: true }).select('-password');

        if (!actualizado) 
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        res.json(actualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al actualizar estudiante' });
    }
};

const eliminarEstudiante = async (req, res) => {
    try {
        const eliminado = await Estudiante.findByIdAndDelete(req.params.id);

        if (!eliminado) 
            return res.status(404).json({ msg: 'Estudiante no encontrado' });
        res.json({ msg: 'Estudiante eliminado' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar estudiante' });
    }
};

export {
    crearEstudiante,
    confirmarEstudiante,
    listarEstudiantes,
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};
