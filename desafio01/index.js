const express = require('express');
const server = express();

server.use(express.json());
let request = 0;
const projects = [];

server.use((req,res,next)=>{
  request++;

  console.log(`O numero de requisicoes foi de: ${request}`)

  return next();
})

function checarProject(req, res, next){
  const { id } = req.params;

  if(!projects[id]){
    return res.status(400).json({error: "Nao existe projeto meu filho"});
  }
  return next();
  
}

server.get('/projects',checarProject, (req, res) =>{ //listar projetos  
  return res.json(projects);
  
});
//ok
server.post('/projects', (req, res)=>{  //criando o projeto com 3 itens: id, title,task
  const projeto = {id,title,tasks} = req.body;
  
  projects.push(projeto);
  
  return res.json(projects);
  });

  //ok
server.put('/projects/:id', checarProject,(req, res) =>{ // Aterar titulo do projeto
  const { id } = req.params;
  const { title } = req.body;
  
  projects.title = title;
  projects [id].title =title;
  
  return res.json(projects);

});  

//ok
server.delete('/projects/:id',checarProject, (req,res)=>{
  const { id } = req.params;
  
  projects.splice(id, 1);

  return res.json(projects);

})
//ok
server.post('/projects/:id/tasks',checarProject, (req,res) =>{
  const { title } = req.body;
  const { id } = req.params;

  projects[id].tasks.push(title);

  return res.json(projects);
})
  


server.listen(3333);
