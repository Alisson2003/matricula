import Matricula from '../models/Matricula.js';
import Estudiante from '../models/Estudiante.js';
import Materia from '../models/Materia.js';

const crearMatricula = async (req, res) => {
  try {
    const { estudiante, materia } = req.body;

    if (!estudiante || !materia) 
      return res.status(400).json({ msg: 'Falta completar todos los campos son obligatorios' });

    const est = await Estudiante.findById(estudiante);
    const mat = await Materia.findById(materia);
    
    if (!est) return res.status(404).json({ msg: 'Estudiante no encontrado en el sistema' });
    if (!mat) return res.status(404).json({ msg: 'Materia no encontrada' });

    const nueva = new Matricula({ estudiante, materia });
    await nueva.save();

    const populated = await nueva.populate('estudiante').populate('materia');
    res.status(201).json(populated);

  } catch (error) {
    console.error(error);

    if (error.code === 11000) 
      return res.status(400).json({ msg: 'Estudiante ya matriculado en esa materia' });

    res.status(500).json({ msg: 'Error al crear matrícula' });
  }
};

const listarMatriculas = async (req, res) => {
  try {

    if (req.auth?.rol === 'estudiante') {

      const lista = await Matricula.find({ estudiante: req.auth.id }).populate('estudiante').populate('materia');
      return res.json(lista);
    }

    const lista = await Matricula.find().populate('estudiante').populate('materia');
    res.json(lista);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar matrículas' });
  }
};

const obtenerMatricula = async (req, res) => {
  try {

    const matricula = await Matricula.findById(req.params.id).populate('estudiante').populate('materia');

    if (!matricula) 
      return res.status(404).json({ msg: 'Matrícula no encontrada en el sistema' });

    if (req.auth?.rol === 'estudiante' && String(matricula.estudiante._id) !== req.auth.id) {
      return res.status(403).json({ msg: 'No puedes ver esta matrícula' });
    }

    res.json(matricula);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al información de la matrícula' });
  }
};

const actualizarMatricula = async (req, res) => {
  try {

    const actualizada = await Matricula.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!actualizada) 
      return res.status(404).json({ msg: 'Matrícula no encontrada en el sistema' });

    res.json(actualizada);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar los datos de la matrícula' });
  }
};

const eliminarMatricula = async (req, res) => {
  try {

    const eliminada = await Matricula.findByIdAndDelete(req.params.id);

    if (!eliminada) 
      return res.status(404).json({ msg: 'Matrícula no encontrada' });
    
    res.json({ msg: 'Matrícula correctamente eliminada del sistema' });

  } catch (error) {

    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar matrícula' });
  }
};

export {
  crearMatricula,
  listarMatriculas,
  obtenerMatricula,
  actualizarMatricula,
  eliminarMatricula
};
