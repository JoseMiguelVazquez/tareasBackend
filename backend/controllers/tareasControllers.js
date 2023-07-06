const getTareas = (req, res) => {
    res.status(200).json({message: 'Get Tareas'})
}

module.exports = {
    getTareas,
}

