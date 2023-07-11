const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    texto: {
        type: String,
        required: [true, 'Por favor teclea una descripcion a la tarea']
    },
    // completado: {
    //     type: Boolean,
    //     default: false
    // },
    // fecha: {
    //     type: Date
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareaSchema)