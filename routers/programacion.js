const express = require('express');

const {programacion} = require('../datos/curso.js').infoCursos;
const routerProgramacion = express.Router();

//Middleware: se ejecuta despues de recibirir una solicitud y antes de enviar una repuesta
routerProgramacion.use(express.json());

routerProgramacion.get('/',(req, res)=>{
    res.send(JSON.stringify(programacion));
})

routerProgramacion.get('/:lenguaje',(req, res) =>{
    const lenguaje = req.params.lenguaje;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje);

    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`);
    }
    
    //Parametro query   
     if(req.query.ordenar === 'vistas'){
       return res.send(JSON.stringify(resultados.sort((a,b) => b.vistas - a.vistas)))
     }

     res.json(resultados);
    
})

routerProgramacion.get('/:lenguaje/:nivel',(req, res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel );

    if(resultados.length === 0){
        return res.status(204).send(`No se encontro la cursos de ${lenguaje} de nivel ${nivel}`)
      //return res.status(404).end();
    }

    res.send(JSON.stringify(resultados))

})

routerProgramacion.post('/', (req, res) =>{
    let cursoNuevo = req.body;
    console.log(req.body);
    programacion.push(cursoNuevo);
    res.json(programacion);
})



routerProgramacion.put('/:id', (req ,res) => {
    let cursoActulizado = req.body;

    //Obtenemos el indice que recibe
    const id = req.params.id;

    //Obtenemos el indice para modificar
    const indice = programacion.findIndex( curso => curso.id == id);

    if(indice >= 0){
      programacion[indice] = cursoActulizado;   
    }
res.send(JSON.stringify(programacion));
})

routerProgramacion.patch('/:id', (req, res) => {
  const infoNueva = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0){
    const cursoAModificar = programacion[indice];

    //Metodo assign() nos permite modificar solo algunas promidades de un Objecto
    Object.assign(cursoAModificar , infoNueva);
  }
  res.send(JSON.stringify(programacion));
});

routerProgramacion.delete('/:id', (req, res) =>{
  const id = req.params.id;

  const indice = programacion.findIndex(curso => curso.id == id);

  if(indice >= 0){
    
    //Metodo splice() nos permite eliminar un elemento especifico de un array
    programacion.splice(indice,1)
  }
  res.send(JSON.stringify(programacion));
});

module.exports = routerProgramacion ;