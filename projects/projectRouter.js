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
module.exports = router;