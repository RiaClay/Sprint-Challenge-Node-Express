const express = require('express');
const router = express.Router();

const db = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    db

     .get()
     .then(projects => {
         res.json(projects);
     })
     .catch(error =>{
         res.status(500).json({ error: "Projects could not be retrieved." });
     })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db

     .get(id)
     .then(project => {
         if (project === undefined) {
             res.status(404).json({ error: "Project ${id} could not be found" });
         } else {
             res.status(200).json(project);
         }
     })
     .catch(error => {
         res.status(500).json({ error: "Could not retrieve information regarding Project ${id}" });
     })
})

router.get('/:id/actions', (req, res) => {
    const { id } = req.params;

    db

     .getProjectActions(id)
     .then(projects => {
         res.status(200).json(projects);
     })
     .catch(error => {
         res.status(500).json({ error: "Could not retrieve actions for Project ${id}." })
     })
})

router.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description };

    db

     .insert(newProject)
     .then(projects => {
         res.status(200).json(newProject);
     })
     .catch(error => {
         res.status(500).json({ error: "New project could not be posted." });
     })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db

     .update(id, update)
     .then(count => {
         if (count > 0) {

            db 
          
             .get(id)
             .then(updatedProject => {
             res.status(200).json(updatedProject[0]);
            })
          } else {
             res.status(404).json({ error: "Project ${id} does not exist" });
          }
     })
     .catch(error => {
         res.status(500).json({ error: "Project ${id} could not be updated." });
     })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let deletedAction;

    db

     .get(id)
     .then(action => {
         deletedAction = {...action[0]};

         db

          .remove(id)
          .then(actions => {
              res.status(200).json(deletedAction);
          })
          .catch(error => {
              res.status(500).json({ error: "The action with id: ${id} could not be deleted." });
          })
     })
     .catch(error => {
         res.status(404).json({ error: "Action ${id} does not exist."});
     })
})

module.exports = router;