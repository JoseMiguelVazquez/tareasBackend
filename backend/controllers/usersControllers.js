const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')


const registerUser = asyncHandler(async (req,res) => {
    //Desestructuramos el req.body
    const {name, email, password} = req.body

    //Verificamos que nos pasen todos los datos requeridos
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    //Verificar que ese usuario no exista
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('Ese usuario ya existe')
    }

    //hash password
    const salt = await bcrypt.genSalt(10) //cadena de texto aleatoria que se concatenará al password
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    }) //name: name (nombre de la propiedad del model y dato destructurado del formulario)

    if(user){
        res.status(201)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(400)
        throw new Error('No se pudo guardar el registro')
    }
})

const loginUser = asyncHandler(async (req,res) => {
    //Desestructuramos los datos del req.body
    const {email, password} = req.body

    //Verificamos que nos pasen todos los datos requeridos
    if(!email || !password){
        res.status(400)
        throw new Error('Faltan datos, favor de verificar')
    }

    //Buscar que el usuario exista
    const user = await User.findOne({email})
    
    //verificar el password
    if(user && (await bcrypt.compare(password, user.password))){//compara el password del input del formulario y el hash del password del usuario en base de datos
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Datos de acceso incorrectos')
    }
})

const getUserData = asyncHandler(async (req,res) => {
    res.json({message: 'User Data'})
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUserData
}