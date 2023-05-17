//Es un framework para node.js
const express = require('express');
const app = express();

const {infoCursos} = require('./datos/curso.js');

//Routers
const routerProgramacion= require('./routers/programacion.js');
app.use('/api/cursos/programacion',routerProgramacion);

const habitacionCarlos= require('./routers/carlos.js');
app.use('/casa/habitacion/carlos',habitacionCarlos);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas',routerMatematicas);

//Routing
app.get('/', (req, res) => {
    res.send('Mi primer servidor con Express. Cursos 💻.')
});

app.get('/api/cursos', (req , res) =>{
    res.send(JSON.stringify(infoCursos));
})

//Si el puerto no esta defenido autumaticamente se define manual
const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () =>{
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}`)
})