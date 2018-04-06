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
             res.status(404).json({ error: "Action ${id} could not be found." });
         } else {
             res.status(200).json(action);
         }
     })
     .catch(error => {
         res.status(500).json({ error: "Could not retrieve information regarding Action ${id}" });
     })
})

router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };

    db

     .insert(newAction)
     .then(actions => {
         res.status(200).json(newAction);
     })
     .catch(error => {
         res.status(500).json({ error: "New action could not be posted." });
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
             .then(updatedAction => {
             res.status(200).json(updatedAction[0]);
            })
          } else {
             res.status(404).json({ error: "Action ${id} does not exist." });
          }
     })
     .catch(error => {
         res.status(500).json({ error: "Action ${id} could not be updated." });
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