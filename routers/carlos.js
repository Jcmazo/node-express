const express = require('express');

const {programacion} = require('../datos/curso.js').infoCursos;
const routerHabitacion = express.Router();

//Middleware: se ejecuta despues de recibirir una solicitud y antes de enviar una repuesta
routerHabitacion.use(express.json());

routerHabitacion.get('/closeth',(req, res)=>{
res.send('camisa')
})


routerHabitacion.post('/closeth',(req, res)=>{
    res.send(req.body)

})



module.exports = routerHabitacion ;