import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from "./config/db.js"
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

const app = express()
app.use(express.json())

// Busca y se conecta al archivo .env
dotenv.config()

// Conexion a la Base de Datos
conectarDB()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            // Puede consulat la API
            callback(null, true)
        } else {
            // No esta permitido consultar la API
            callback(new Error('Error de Cors'))
        }
    },
}
app.use(cors(corsOptions))

// Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000

const servidor = app.listen(PORT, () => {
    console.log('servidor corriendo')
})

// Socket.io
import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors:{
        origin: process.env.FRONTEND_URL
    },
})

io.on('connection', (socket) => {

    // Definir los eventos de socket io
    socket.on('abrir proyecto', (proyecto) => {
        socket.join(proyecto)
    })

    socket.on('nueva tarea', tarea => {
        socket.to(tarea.proyecto).emit('tarea agregada', tarea)
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('nuevo estado', tarea)
    })
})
