const express = require('express');
const router = express.Router();

const db = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
    db

     .get()
     .then(actions => {
         res.json(actions);
     })
     .catch(error =>{
         res.status(500).json({ error: "Actions could not be retrieved." });
     })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db

     .get(id)
     .then(action => {
         if (action === undefined) {
             res.status(404).json({ error: "Action ${id} could not be found" });
         } else {
             res.status(200).json(action);
         }
     })
     .catch(error => {
         res.status(500).json({ error: "Could not retrieve information regarding Action ${id}" });
     })
})

router.post('/', (req, res) => {
    const { description, notes } = req.body;
    const newAction = { description, notes };

    db

     .insert(newAction)
     .then(actions => {
         res.status(200).json(newAction);
     })
     .catch(error => {
         res.status(500).json({ error: "New action could not be posted." });
     })
})

module.exports = router;