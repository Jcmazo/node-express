const express = require('express');

const routerMatematicas = express.Router();

const {matematicas} = require('../datos/curso.js').infoCursos;

routerMatematicas.get('/',(req, res)=>{
    res.send(JSON.stringify(matematicas));
})

routerMatematicas.get('/:tema',(req, res)=>{
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);

    if(resultados.length === 0){
        return res.status(404).send(`No se encontro la materia de ${tema}.`)
    }

    res.send(JSON.stringify(resultados))
});

module.exports = routerMatematicas;