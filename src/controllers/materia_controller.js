import Materia from "../models/Materia.js"

const crearMateria = async (req, res) => {
    try {
        const { codigo, nombre, creditos } = req.body
        if (!codigo || !nombre) return res.status(400).json({ msg: "Completar todos los campos" })

        const materias = await Materia.findOne({ codigo })
        
        if (materias) 
            return res.status(400).json({ msg: "El código ya existe" })

        const materia = new Materia({ codigo, nombre, creditos })
        await materia.save()
        res.status(201).json(materia)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al crear materia" })
    }
}

const listarMaterias = async (req, res) => {
    try {
        const materias = await Materia.find().sort({ createdAt: -1 })
        res.json(materias)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al listar las materias" })
    }
}

const obtenerMateria = async (req, res) => {
    try {
        const materia = await Materia.findById(req.params.id)
        if (!materia) return res.status(404).json({ msg: "Materia no encontrada" })
        res.json(materia)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al obtener detalles de la materia" })
    }
}

const actualizarMateria = async (req, res) => {
    try {
        const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!materia) return res.status(404).json({ msg: "Materia no encontrada" })
        res.json(materia)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al actualizar materia" })
    }
}

const eliminarMateria = async (req, res) => {
    try {
        const materia = await Materia.findByIdAndDelete(req.params.id)
        if (!materia) return res.status(404).json({ msg: "Materia no encontrada" })
        res.json({ msg: "Materia correctamente eliminada" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al eliminar materia" })
    }
}

export {
    crearMateria,
    listarMaterias,
    obtenerMateria,
    actualizarMateria,
    eliminarMateria
}
