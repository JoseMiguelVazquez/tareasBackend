const express = require('express')
const router = express.Router()
const { getTareas } = require('../controllers/tareasControllers')

router.get('/', getTareas)

router.post('/', (req, res) => {
    res.status(201).json({message: 'Crear Tareas'})
})

router.put('/:id', (req, res) => {
    res.status(200).json({message: `Modificar la tarea con id ${req.params.id}`})
})

router.delete('/:id', (req, res) => {
    res.status(200).json({message: `Borrar la tarea con id ${req.params.id}`})
})

module.exports = router

