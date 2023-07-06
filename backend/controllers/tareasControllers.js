const asyncHandler = require('express-async-handler')


const getTareas = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'Get Tareas'})
})

const createTareas = asyncHandler( async (req, res) => {

    if(!req.body.texto) {
        res.status(400)
        throw new Error('Por favor teclea una descripcion a la tarea')
    }
    // console.log(req.body.texto)
    res.status(201).json({message: 'Crear Tareas'})
        
})

const updateTareas = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Modificar la tarea con id ${req.params.id}`})
})

const deleteTareas = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Borrar la tarea con id ${req.params.id}`})
})

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}

