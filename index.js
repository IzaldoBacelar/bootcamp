const express = require ('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//request body = {"Name": "izaldo", "email": "izaldo.figueiroa.b@gmail.com"},

// CRUD - CREATE, READ , UPDAT , DELETE

const users = ['Izaldo','Roberto','Brenda'];

server.use((req,res, next ) =>{
  console.time('Request')
  console.log (`Metodo:${req.method}; URL: ${req.url}`);
  
   next();

   console.timeEnd('Request');
});

function checkUserExist (req, res, next) { // envia uma mensagem de error quando o parameto "name" eh utilizado de forma errada
  if (!req.body.name){
    return res.status(400).json({ error: 'User name is required' });
  }
  
  return next();
}
function checkUserInArray (req, res, next) { // envia um error quando o users requisitado nao existir
  const user = users[req.params.index]
  
  if (!user){
    return res.status(400).json({ error: 'User does not exist' });
  }
  
  req.user = user;

  return next();
}


server.get('/users',(req, res)=>{
  return res.json(users);
})

server.get('/users/:index',checkUserInArray,(req, res)=> { // req= dados da requisicao; res = informacoes que retornam pro front
  return res.json(req.user);
})

server.post('/users', checkUserExist, (req, res) => {   // rota para criar (post) um usuario 
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExist, checkUserInArray, (req, res) => { // rota para modificar (put) um usuario 
  const { index } = req.params;
  const { name } = req.body
  
  users [index] = name;

  return res.json(users);
  })

  server.delete('/users/:index',checkUserInArray, (req, res) => { // rota para deletar (delete) usuario  
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
  })

server.listen(3000);