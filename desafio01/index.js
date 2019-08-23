const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

server.get('/projects', (req, res) =>{
  return res.json(projects);
});

server.post('/projects', (req, res)=>{  //Rota recebendo um campo title e aramzenando uma nova trefa no array ...    
  const projeto = {id,title,task} = req.body;
  
  projects.push(projeto)
  
  return res.json(projects);
  });

server.put('/projects/:id', (req, res) =>{
  const { id } = req.params;
  const { title } = req.body;
  
  projects.title = title;
  projects [id].title =title
  return res.json(projects);

});  
  

  server.post('/projects/:id/tasks', (req, res ) =>{


  return res.json(projects);
});


server.listen(3333);
